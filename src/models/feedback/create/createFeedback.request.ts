import { FeedbackForm } from "../../../form/schemas/FeedbackSchema";

export type CreateFeedbackRequest = {
  contactId: string;
} & FeedbackForm;
