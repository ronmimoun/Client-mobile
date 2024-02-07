import { createSlice, Reducer } from "@reduxjs/toolkit";
import { CategoryManagerState } from "./categoryManager-state";
import { categoryManagerThunkActionsBuilder } from "./categoryManager.thunk-builder";

const initialState: CategoryManagerState = {
  categories: [],
  companies: [],
  jobTitles: [],
  countries: [],
};

export const categoryManagerSlice = createSlice({
  name: "categoryManager",
  initialState,
  reducers: {
    // ALL
    setAllCategoriesManager: (state, action) => {
      state.categories = action.payload.categories;
      state.jobTitles = action.payload.jobTitles;
      state.companies = action.payload.companies;
      state.countries = action.payload.territories;
    },

    // CATEGORIES
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
    },
    saveCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    // COMPANIES
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (item) => item._id !== action.payload
      );
    },
    saveCompany: (state, action) => {
      state.companies.push(action.payload);
    },

    // JOB TITLES
    setJobTitles: (state, action) => {
      state.jobTitles = action.payload;
    },
    deleteJobTitle: (state, action) => {
      state.jobTitles = state.jobTitles.filter(
        (item) => item._id !== action.payload
      );
    },
    saveJobTitle: (state, action) => {
      state.jobTitles.push(action.payload);
    },

    // TERRITORIES
    setTerritories: (state, action) => {
      state.countries = action.payload;
    },
    deleteTerritory: (state, action) => {
      state.countries = state.countries.filter(
        (item) => item._id !== action.payload
      );
    },
    saveTerritory: (state, action) => {
      state.countries.push(action.payload);
    },
  },
  extraReducers: categoryManagerThunkActionsBuilder,
});

export const categoryManagerInitialState = initialState;

const categoryManagerReducer: Reducer<CategoryManagerState> =
  categoryManagerSlice.reducer;
export default categoryManagerReducer;
