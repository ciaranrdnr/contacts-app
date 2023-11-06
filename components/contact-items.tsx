import React from "react";
import { IContact, TContactsArray } from "@/helpers/contact-helper";
import ContactItem from "./contact-item";
import { EmptyContact } from "@/styles/styled";

interface IContactItemsProps {
  isFavorite: boolean;
  contacts: {
    filteredContacts: TContactsArray;
    favorites: TContactsArray;
  };
  onDelete: (id: number) => void;
  onViewDetail: (contact: IContact) => void;
  onRemoveFav: (id: number) => void;
  onFavorite: (contact: IContact) => void;
}

const ContactItems = React.memo(
  ({
    isFavorite,
    contacts,
    onDelete,
    onViewDetail,
    onRemoveFav,
    onFavorite,
  }: IContactItemsProps) => {
    const contactsList = isFavorite
      ? contacts.favorites
      : contacts.filteredContacts;
    const variant = isFavorite ? "favorite" : "default";

    return (
      <>
        {contactsList.length > 0 ? (
          contactsList.map((contact) => (
            <ContactItem
              variant={variant}
              key={contact.id}
              contact={contact}
              onDelete={() => onDelete(contact.id)}
              onViewDetail={() => onViewDetail(contact)}
              onRemoveFav={() => onRemoveFav(contact.id)}
              onFavorite={() => onFavorite(contact)}
            />
          ))
        ) : (
          <EmptyContact>Kontak kosong.</EmptyContact>
        )}
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.contacts === nextProps.contacts
);
ContactItems.displayName = "ContactItems";
export default ContactItems;
