import { UserAuthResponse } from "../../models/auth/Login/Login.response";
import { CountryModel } from "../../types/country/CountryModel";
import { UserModel } from "../../types/user.type";

type UserState = {
  currentUser: UserModel | null;
  countryPreference: CountryModel | null;
  jwtToken: string | null;
};
