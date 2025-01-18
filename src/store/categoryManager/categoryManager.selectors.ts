import { CountryModel } from "../../types/entities/country/CountryModel";
import { RootState } from "../root.reducers";

const categoryManager = () => {
  return (state: RootState) => {
    return state.categoryManager;
  };
};

const countries = (state: RootState): CountryModel[] =>
  state.categoryManager.countries;

export const categoryManagerSelectors = {
  categoryManager,
  countries,
};
