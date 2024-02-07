import { CategoryModel } from "../store/categoryManager/categoryManager-state";
import { store } from "./non-circular-injections.utils";

function getCompaniesByCategory(selectedCategory?: CategoryModel) {
  const companies = store.getState().categoryManager.companies;

  if (!selectedCategory) return companies;
  return companies.filter(
    (company) => company.category === selectedCategory.cat
  );
}

export const categoryManagerUtilService = {
  getCompaniesByCategory,
};
