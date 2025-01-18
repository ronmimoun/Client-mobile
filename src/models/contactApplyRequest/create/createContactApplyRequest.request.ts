import { AgentModel } from "../../../types/entities/agent.type";
import { ContactModel } from "../../../types/entities/contact/contact.type";

export type CreateContactApplyRequest = {
  contactInfo: ContactApplyRequestFormType;
  isApproved: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  agent: AgentModel;
};

export type CreateControlledContactApplyRequest = {
  request: ContactApplyRequestFormType;
  agent: AgentModel;
};

export type ContactApplyRequestFormType = Pick<
  ContactModel,
  | "_id"
  | "category"
  | "company"
  | "name"
  | "familyName"
  | "jobTitle"
  | "country"
  | "desc"
  | "phone"
  | "linkedinLink"
>;
