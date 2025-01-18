import { ContactModel } from "./contact/contact.type";

export type ContactRequestModel = {
  contact: ContactModel;
  isApproved: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};
