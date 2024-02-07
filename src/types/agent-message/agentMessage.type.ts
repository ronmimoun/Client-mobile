import { ContactModel } from "../contact/contact.type";

export type AgentMessageModel = {
  agentId: string;
  contact: ContactModel;
  createdAt: string;
  isRead: boolean;
  message: string;
  readAt: string | null;
  userCategory: string;
  userCompany: string;
  userId: string;
  userJobTitle: string;
  userLinkedInUrl: string;
  username: string;
  _id: string;
};
