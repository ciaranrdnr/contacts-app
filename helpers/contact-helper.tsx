export interface IContact {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: IPhone[];
}

export interface IPhone {
  number?: string;
}
export interface INewContactData {
  first_name: string;
  last_name: string;
  phones: IPhone[];
}

export type TContactsArray = IContact[];

export const updateLocalStorage = (
  newContacts: TContactsArray,
  newFavorites: TContactsArray
) => {
  localStorage.setItem("contacts", JSON.stringify(newContacts));
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

export const syncStateWithLocalStorage = (
  setContacts: any,
  setFavorites: any
) => {
  const storedContactsJSON = localStorage.getItem("contacts");
  const storedFavoritesJSON = localStorage.getItem("favorites");

  const storedContacts = storedContactsJSON
    ? JSON.parse(storedContactsJSON)
    : [];
  const storedFavorites = storedFavoritesJSON
    ? JSON.parse(storedFavoritesJSON)
    : [];

  setFavorites(storedFavorites);

  const contactsExcludingFavorites = storedContacts.filter(
    (contact: IContact) =>
      !storedFavorites.some((favorite: IContact) => favorite.id === contact.id)
  );

  setContacts(contactsExcludingFavorites);
};
