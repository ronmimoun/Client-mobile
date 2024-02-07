import { ContactTransactionType } from "../enums/Contact/ContactTransactionType";
import { CreditPurchaseEnum } from "../enums/CreditTransaction/creditTransaction.enum";
import { ContactTransaction } from "../models/contactTransaction/contactTransaction";
import { CreditTransaction } from "../models/creditTransaction/creditTransaction.model";
import { paymentApiService } from "../services/payment/payment.api.service";
import store from "../store";
import { ContactModel } from "../types/contact/contact.type";
import { CreditModel } from "../types/credit/credit.type";

function createCreditPaymentRequest(requestPayload: {
  credit: CreditModel;
  type: CreditPurchaseEnum;
}) {
  const { credit, type } = requestPayload;
  const user = store.getState().user.currentUser;

  if (!user) return;

  const trans = new CreditTransaction({ credit, type, user });
  return [trans];
}

async function createContactPaymentRequest(requestPayload: ContactModel[]) {
  const user = store.getState().user.currentUser;

  if (!user) return;
  const transactions = requestPayload.map(
    (contact) => new ContactTransaction(contact, user._id)
  );

  const payload = {
    transactions,
    userId: user._id,
    type: ContactTransactionType.ContactPurchase,
  };

  const contactPayment = await paymentApiService.createContactPayment(payload);
  return contactPayment;
}

export const paymentUtilService = {
  createCreditPaymentRequest,
  createContactPaymentRequest,
};