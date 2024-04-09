import { AgentModel } from "../agent.type";

export type ContactModel = {
  company: string;
  desc: string;
  country?: string;
  category: string;
  jobTitle: string;
  price: number;
  inStock: boolean;
  name: string;
  familyName: string;
  emails: Email[];
  mobile: string;
  phone: string;
  linkedinLink: string;
  agent: AgentModel;
  img: Image;
  createdAt: Date;
  transactionHistory: Array<TransactionHistory>;
  averageRating: number;
  numberOfRatings: number;
  _id: string;
};

type Email = {
  emailUrl: string;
  type: string;
};

type Image = {
  url: string;
  _id: string;
};

type TransactionHistory = {
  transactionId: string;
  createdAt: string;
  priceInCredit: number;
  userId: string;
  type: string;
};

export type PresentativeContact = Pick<
  ContactModel,
  "_id" | "category" | "company" | "jobTitle" | "img" | "price"
>;
