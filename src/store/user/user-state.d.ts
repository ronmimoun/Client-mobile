import { UserAuthResponse } from "../../models/auth/Login/Login.response";
import { CountryModel } from "../../types/country/CountryModel";

type UserState = {
  currentUser: UserAuthResponse | null;
  countryPreference: CountryModel | null;
};
