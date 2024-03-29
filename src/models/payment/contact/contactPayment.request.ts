import { ContactTransactionType } from "../../../enums/Contact/ContactTransactionType";
import { ContactTransaction } from "../../contactTransaction/contactTransaction";

export type ContactPaymentRequest = {
  transactions: ContactTransaction[];
  type: ContactTransactionType;
};
