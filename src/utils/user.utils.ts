import { STORAGE_KEY_LOGGEDIN_USER } from "../constants/storage.constatns";
import { CREDIT_VALUE } from "../constants/values.constants";
import { ContactTransactionType } from "../enums/Contact/ContactTransactionType";
import { UserAuthResponse } from "../models/auth/Login/Login.response";
import { ContactModel } from "../types/contact/contact.type";
import { CountryModel } from "../types/country/CountryModel";

const getMostRecentObject = (arr: any) => {
  if (arr.length === 0) {
    return null; // Return null if the array is empty
  }

  let mostRecentObject = arr[0];
  let mostRecentDate = new Date(mostRecentObject.createdAt);

  for (let i = 1; i < arr.length; i++) {
    const currentDate = new Date(arr[i].createdAt);
    if (currentDate > mostRecentDate) {
      mostRecentDate = currentDate;
      mostRecentObject = arr[i];
    }
  }

  return mostRecentObject;
};

function getContactPurchaseType(user: UserAuthResponse | null) {
  if (user) {
    return user.contactTransactions.filter(
      (transaction) =>
        transaction.type === ContactTransactionType.ContactPurchase
    );
  } else return [];
}

function saveLocalUser(user: UserAuthResponse) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLocalUserCountryPreference(): CountryModel | null {
  const user = getLoggedinUser();
  if (!user) return null;
  if (!user.countryPreferences.length) return null;
  return user.countryPreferences[0];
}

function getLoggedinUser(): UserAuthResponse | null {
  const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
  if (!user) return null;
  return JSON.parse(user);
}

function clearLocalUser() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function calculateUserCredits(cart: ContactModel[], user: UserAuthResponse) {
  const sum = cart.reduce((acc, contact) => (acc += contact.price), 0);
  if (user.credits >= sum / CREDIT_VALUE) return true;
  else return false;
}

function isAgent(user: UserAuthResponse | null): boolean {
  if (!user) return false;
  return user.permissions.includes("agent");
}

export const userUtilService = {
  getMostRecentObject,
  getContactPurchaseType,
  saveLocalUser,
  getLoggedinUser,
  clearLocalUser,
  calculateUserCredits,
  getLocalUserCountryPreference,
  isAgent,
};
