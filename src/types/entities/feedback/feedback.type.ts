import { ContactModel } from "../contact/contact.type";

export type FeedbackModel = {
  comment: string;
  contact: ContactModel;
  createdAt: string;
  rating: number;
  userId: string;
  _id: string;
};
