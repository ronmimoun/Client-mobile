import { CREDIT_VALUE } from "../../constants/values.constants";
import { PresentativeContactType } from "../../types/entities/contact/contact.type";

export class ContactTransaction {
  contact;
  priceInCredit;
  createdAt = new Date();
  userId;

  constructor(contact: PresentativeContactType, userId: string) {
    this.contact = contact;
    this.priceInCredit = contact.price / CREDIT_VALUE;
    this.userId = userId;
  }
}
