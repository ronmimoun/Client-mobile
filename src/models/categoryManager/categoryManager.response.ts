import {
  CategoryModel,
  CompanyModel,
  JobTitleModel,
} from "../../store/categoryManager/categoryManager-state";
import { CountryModel } from "../../types/country/CountryModel";

export type getCategoryManagerResponse = object & CategoryManager;

export interface CategoryManager {
  categories: Array<CategoryModel>;
  companies: Array<CompanyModel>;
  jobTitles: Array<JobTitleModel>;
  countries: Array<CountryModel>;
}
