/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ContactItem from "@/components/contact-item";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { ADD_QUERY, DELETE_QUERY, GET_QUERY } from "@/lib/queries";

import NewContactForm from "@/components/form";
import ContactDetailPopup from "@/components/contact-detail";
import {
  IContact,
  INewContactData,
  TContactsArray,
  syncStateWithLocalStorage,
} from "@/helpers/contact-helper";
import {
  addToFavoritesHandler,
  handleAddContactComplete,
  handleAddContactError,
  handleContactsFilter,
  handleDelete,
  handleNewContactSubmit,
  removeFromFavoritesHandler,
} from "@/handlers/contact-handler";
import {
  ButtonTextStyled,
  EmptyContact,
  HeaderStyled,
  HeadingStyled,
} from "@/styles/styled";

import { css } from "@emotion/react";
import Tabs from "../tab";

const ContactList = () => {
  const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<TContactsArray>([]);
  const [favorites, setFavorites] = useState<TContactsArray>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showPopupAdd, setShowPopupAdd] = useState(false);

  const tabs = ["Kontak", "Favorit"];

  const handleChangeContacts = (contacts: TContactsArray) => {
    setContacts(contacts);
  };

  const {
    loading: getLoading,
    error,
    data,
    refetch,
  } = useQuery(GET_QUERY.CONTACT_LIST, {
    onCompleted: (data) => {
      updateContactsState(data.contact);
    },
  });

  const [addContactWithPhones, { loading: addLoading }] = useMutation(
    ADD_QUERY.CONTACT_WITH_PHONE,
    {
      onCompleted: (data) => handleAddContactComplete(data, setContacts),
      onError: handleAddContactError,
    }
  );

  const [deleteContact] = useMutation(DELETE_QUERY.CONTACT_MUTATION, {
    onCompleted: () => refetch(),
  });

  

  const handleOpenPopup = (contact: IContact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
  };

  const onNewContactSubmit = async (
    newContactData: INewContactData,
    resetForm: any
  ) => {
    await handleNewContactSubmit(
      newContactData,
      contacts,
      resetForm,
      addContactWithPhones
    );
  };

  const onDelete = (id: number) => {
    handleDelete(
      deleteContact,
      contacts,
      setContacts, // This is your handleChangeContacts function
      id
    ).catch(console.error);
  };

  const updateContactsState = (contactData: TContactsArray) => {
    handleChangeContacts(
      contactData.filter(
        (contact: IContact) => !favorites.some((fav) => fav.id === contact.id)
      )
    );
    localStorage.setItem("contacts", JSON.stringify(contactData));
  };

  const addToFavorites = (contact: IContact) => {
    addToFavoritesHandler(
      contact,
      favorites,
      contacts,
      setFavorites,
      handleChangeContacts
    );
  };

  const removeFromFavorites = (contactId: number) => {
    removeFromFavoritesHandler(
      contactId,
      favorites,
      contacts,
      data,
      setFavorites,
      handleChangeContacts
    );
  };

  const editContactPhoneNumber = (phoneId: number, newPhoneNumbers: any) => {
    const updatedContacts = contacts.map((contact: IContact) =>
      contact.id === selectedContact?.id
        ? { ...contact, phones: newPhoneNumbers }
        : contact
    );
    updateContactsState(updatedContacts);
  };

  const filteredContacts = handleContactsFilter(contacts, searchTerm);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(0); 
  };

  const ContactItems = ({ isFavorite }: { isFavorite?: boolean }) => {
    const contactsToShow = filteredContacts.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE
    );
    const contacts = isFavorite ? favorites : contactsToShow;
    const variant = isFavorite ? "favorite" : "default";
    return contacts.length > 0 ? (
      contacts.map((contact: IContact, index: number) => (
        <ContactItem
          variant={variant}
          key={contact.id + index}
          contact={contact}
          onDelete={() => onDelete(contact.id)}
          onViewDetail={() => handleOpenPopup(contact)}
          onRemoveFav={() => removeFromFavorites(contact.id)}
          onFavorite={() => addToFavorites(contact)}
        />
      ))
    ) : (
      <EmptyContact>Kontak kosong.</EmptyContact>
    );
  };

  useEffect(() => {
    syncStateWithLocalStorage(setContacts, setFavorites);
  }, []);

  useEffect(()=>{
    if(selectedContact ||showPopupAdd ){
      document.body.style.overflow = 'hidden';
    }
  },[selectedContact,showPopupAdd])


  if (getLoading) return <EmptyContact>Loading...</EmptyContact>;
  if (error) return <p>Maaf, gagal menampilkan kontak</p>;

  return (
    <div css={{ position: "relative", maxWidth: "600px", margin: "auto"}}>
      <div
        css={{ position: "sticky", top: 0, background: "white", zIndex: 10 }}
      >
        <HeaderStyled>
          <HeadingStyled>Daftar Kontak</HeadingStyled>
          <ButtonTextStyled onClick={() => setShowPopupAdd(true)}>
            Tambah Kontak
          </ButtonTextStyled>
        </HeaderStyled>
        <Search onSearch={handleSearch} />
        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          onClick={(e) => {
            setActiveTab(e);
          }}
        />
      </div>
      {showPopupAdd && (
        <NewContactForm
          onClose={() => setShowPopupAdd(false)}
          onAddContact={onNewContactSubmit}
        />
      )}
      {tabs[activeTab] == "Kontak" ? (
        <div>
          <ContactItems />
          <Pagination
            currentPage={currentPage}
            totalCount={filteredContacts.length}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div>
          <ContactItems isFavorite />
        </div>
      )}

      {selectedContact !== null && (
        <ContactDetailPopup
          isFavorite={activeTab == 1}
          contact={selectedContact}
          onClose={handleClosePopup}
          onContactUpdated={editContactPhoneNumber}
        />
      )}
    </div>
  );
};

export default ContactList;
