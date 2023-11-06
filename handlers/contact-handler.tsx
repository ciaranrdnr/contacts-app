import {
  IContact,
  INewContactData,
  IPhone,
  TContactsArray,
  updateLocalStorage,
} from "@/helpers/contact-helper";

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ADD NEW CONTACT

export const handleAddContactComplete = (
  data: any,
  setContacts: (value: React.SetStateAction<TContactsArray>) => void
) => {
  const newContact = data?.insert_contact?.returning[0];
  setContacts((prevContacts) => {
    const updatedContacts = [...prevContacts, newContact];
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    return updatedContacts;
  });
};

export const handleAddContactError = (error: { message: string }) => {
  if (error.message.includes("unique constraint")) {
    alert("Nama kontak sudah terdaftar, tambahkan nama lainnya.");
  } else if (error.message.includes("special characters")) {
    alert(
      "Nama kontak hanya bisa alfanumerik."
    );
  } else {
    console.error("Gagal menambahkan kontak.", error);
  }
};
export const handleNewContactSubmit = async (
  newContactData: INewContactData,
  contacts: TContactsArray,
  resetNewContact: any,
  addContactWithPhones: any
) => {
  const { first_name, last_name, phones } = newContactData;
  if (!/^[A-Za-z0-9 ]+$/.test(first_name)) {
    alert(
      "Nama kontak hanya bisa alfanumerik."
    );
    return;
  }

  if (contacts.some((contact) => contact.first_name === first_name)) {
    alert("Nama kontak sudah terdaftar, tambahkan nama lainnya.");
    return;
  }

  try {
    await addContactWithPhones({
      variables: {
        first_name: first_name,
        last_name: last_name,
        phones: phones.map((phone) => ({ number: phone })),
      },
    });
    resetNewContact({
      first_name: "",
      last_name: "",
      phones: [""],
    });
  } catch (error) {
    console.error("Gagal menambahkan kontak.", error);
  }
};

// DELETE
export const handleDelete = async (
  deleteContact: Function,
  contacts: IContact[],
  handleChangeContacts: (contacts: IContact[]) => void,
  id: number
): Promise<void> => {
  await deleteContact({ variables: { id } });

  const updatedContacts = contacts.filter(
    (contact: IContact) => contact.id !== id
  );
  handleChangeContacts(updatedContacts);

  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
};

// FAVORITE

export const addToFavoritesHandler = (
  contact: IContact,
  favorites: IContact[],
  contacts: IContact[],
  setFavorites: Function,
  handleChangeContacts: Function
) => {
  const updatedFavorites = [...favorites, contact];
  const updatedContacts = contacts.filter((c) => c.id !== contact.id);

  setFavorites(updatedFavorites);
  handleChangeContacts(updatedContacts);
  console.log(updatedContacts.length);
  updateLocalStorage(updatedContacts, updatedFavorites);
};

export const removeFromFavoritesHandler = (
  contactId: number,
  favorites: IContact[],
  contacts: IContact[],
  data: any,
  setFavorites: Function,
  handleChangeContacts: Function
) => {
  const updatedFavorites = favorites.filter((c) => c.id !== contactId);
  setFavorites(updatedFavorites);

  const contactToAddBack = data.contact.find(
    (c: IContact) => c.id === contactId
  );
  if (contactToAddBack) {
    const updatedContacts = [...contacts, contactToAddBack];
    handleChangeContacts(updatedContacts);

    updateLocalStorage(updatedContacts, updatedFavorites);
  }
};

// SEARCH

export const handleContactsFilter = (
  contacts: IContact[],
  searchTerm: string
): IContact[] => {
  if (!searchTerm.trim()) {
    return contacts;
  }

  const lowercasedSearchTerm = searchTerm.toLowerCase();

  const filteredContacts = contacts.filter((contact: IContact) => {
    const nameMatch =
      contact.first_name.toLowerCase().includes(lowercasedSearchTerm) ||
      contact.last_name.toLowerCase().includes(lowercasedSearchTerm);

    const phoneMatch = contact.phones.some((phone: IPhone) =>
      phone.number?.includes(searchTerm)
    );

    return nameMatch || phoneMatch;
  });

  return filteredContacts;
};
