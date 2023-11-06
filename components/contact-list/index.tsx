/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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

import Tabs from "@/components/tab";
import LoadingState from "@/components/loading-state";
import ContactItems from "@/components/contact-items";

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

  const [getContacts, { loading: getLoading, error, data }] = useLazyQuery(
    GET_QUERY.CONTACT_LIST,
    {
      onCompleted: (data) => {
        updateContactsState(data.contact);
      },
    }
  );

  const [addContactWithPhones, { loading: addLoading }] = useMutation(
    ADD_QUERY.CONTACT_WITH_PHONE,
    {
      onCompleted: (data) => handleAddContactComplete(data, setContacts),
      onError: handleAddContactError,
    }
  );

  const [deleteContact] = useMutation(DELETE_QUERY.CONTACT_MUTATION);

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

  useEffect(() => {
    syncStateWithLocalStorage(setContacts, setFavorites);
  }, []);

  useEffect(() => {
    getContacts();
    syncStateWithLocalStorage(setContacts, setFavorites);
  }, [getContacts]);

  useEffect(() => {
    if (data && data.contact) {
      setContacts(data.contact);
      localStorage.setItem("contacts", JSON.stringify(data.contact));
    }
  }, [data]);

  useEffect(() => {
    document.body.style.overflow =
      selectedContact || showPopupAdd ? "hidden" : "scroll";
  }, [selectedContact, showPopupAdd]);

  if (getLoading) {
    <LoadingState />;
  }
  if (error) return <EmptyContact>Maaf, gagal menampilkan kontak</EmptyContact>;

  return (
    <div css={{ position: "relative", maxWidth: "600px", margin: "auto" }}>
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
      <>
        {showPopupAdd && (
          <NewContactForm
            onClose={() => setShowPopupAdd(false)}
            onAddContact={onNewContactSubmit}
          />
        )}
          <div>
            <ContactItems 
              isFavorite={tabs[activeTab] == "Favorit"}
              contacts={{ filteredContacts, favorites }}
              onDelete={onDelete}
              onViewDetail={handleOpenPopup}
              onRemoveFav={removeFromFavorites}
              onFavorite={addToFavorites}
            />
           {tabs[activeTab] !== "Favorit" &&<Pagination
              currentPage={currentPage}
              totalCount={filteredContacts.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />}
          </div>
        
        {getLoading && <EmptyContact>Loading...</EmptyContact>}
        {selectedContact !== null && (
          <ContactDetailPopup
            isFavorite={activeTab == 1}
            contact={selectedContact}
            onClose={handleClosePopup}
            onContactUpdated={editContactPhoneNumber}
          />
        )}
      </>
    </div>
  );
};

export default ContactList;
