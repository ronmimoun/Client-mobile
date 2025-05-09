import {
  STORAGE_KEY_JWT_TOKEN,
  STORAGE_KEY_LOGGEDIN_USER,
} from "../constants/storage.constatns";
import { CREDIT_VALUE } from "../constants/values.constants";
import { ContactTransactionType } from "../enums/Contact/ContactTransactionType";
import { PresentativeContactType } from "../types/entities/contact/contact.type";
import { CountryModel } from "../types/entities/country/CountryModel";
import { UserModel } from "../types/entities/user.type";

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

function getContactPurchaseType(user: UserModel | null) {
  if (user) {
    return user.contactTransactions.filter(
      (transaction) =>
        transaction.type === ContactTransactionType.ContactPurchase
    );
  } else return [];
}

function saveLocalUser(user: UserModel) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLocalUserCountryPreference(): CountryModel | null {
  const user = getLoggedinUser();
  if (!user) return null;
  if (!user.countryPreferences.length) return null;
  return user.countryPreferences[0];
}

function getLoggedinUser(): UserModel | null {
  const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
  if (!user) return null;
  return JSON.parse(user);
}

function clearLocalUser() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function calculateUserCredits(
  cart: PresentativeContactType[],
  user: UserModel
) {
  const sum = cart.reduce((acc, contact) => (acc += contact.price), 0);
  if (user.credits >= sum / CREDIT_VALUE) return true;
  else return false;
}

function isAgent(user: UserModel | null): boolean {
  if (!user) return false;
  return user.permissions.includes("agent");
}

function saveUserJwtToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY_JWT_TOKEN, token);
  return token;
}

function getUserJwtToken() {
  const token = sessionStorage.getItem(STORAGE_KEY_JWT_TOKEN);
  if (!token) return null;
  return token;
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
  saveUserJwtToken,
  getUserJwtToken,
};
