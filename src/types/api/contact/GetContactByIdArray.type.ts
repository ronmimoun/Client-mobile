import { ContactModel } from "../../entities/contact/contact.type";

export type GetContactsByIdArrayRequest = {
  contactsId: string[];
};

export type GetContactsByIdArrayResponse = {} & ContactModel[];
