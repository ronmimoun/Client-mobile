import { ContactTransactionType } from "../../enums/Contact/ContactTransactionType";
import { AgentMessageModel } from "./agent-message/agentMessage.type";
import { PresentativeContactType } from "./contact/contact.type";
import { CountryModel } from "./country/CountryModel";

// ****** API ******
export type UpdateUserContactDisclosureRequest = {
  revealCount: number;
  contactRevealed: PresentativeContactType;
};

export type UpdateUserContactDisclosureResponse = {} & UserModel;

// ****** Models ******
export type UserModel = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: ImgUrl;
  phone: string;
  address: string;
  fullname: string;
  isActive: boolean;
  gender: string;
  permissions: Array<string>;
  favorites: Array<PresentativeContactType>;
  credits: number;
  creditTransactions: Array<any>;
  contactTransactions: Array<ContactTransaction>;
  contactUploads: Array<any>;
  searchHistory: Array<any>;
  notifications: Array<any>;
  income: number;
  verified: boolean;
  approveStatus: string;
  countryPreferences: Array<CountryModel>;
  agentMessages: Array<AgentMessageModel>;
  contactDisclosure: ContactDisclosure;
};

type ImgUrl = {
  url: string;
  _id: string;
};

export type ContactDisclosure = {
  revealCount: number;
  contactsRevealed: PresentativeContactType[];
  nextRevealCountReset: Date;
};

export type UserInfo = {
  fullname?: string;
  userId?: string;
  imgUrl?: ImgUrl;
};

export type ContactTransaction = {
  _id: string;
  type: ContactTransactionType;
  contactId: string;
  priceInCredit: number;
  createdAt: Date;
  purchasedByUserId: string;
  soldByUserId: string;
};
