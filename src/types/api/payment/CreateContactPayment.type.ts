import { ContactTransactionType } from "../../../enums/Contact/ContactTransactionType";
import { UserModel } from "../../entities/user.type";

export type CreateContactPaymentRequest = {
  type: ContactTransactionType;
  contactId: string;
  purchasedByUserId: string;
  priceInCredit: number;
  soldByUserId: string;
};

export type CreateContactPaymentResponse = {} & UserModel;
