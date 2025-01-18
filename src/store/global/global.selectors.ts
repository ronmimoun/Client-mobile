import { RootState } from "../root.reducers";

const isLoading = (state: RootState): boolean => state.global.loaderCount > 0;
const isConfigLoaded = (state: RootState): boolean =>
  state.global.isConfigLoaded;

export const globalSelectors = {
  isLoading,
  isConfigLoaded,
};
