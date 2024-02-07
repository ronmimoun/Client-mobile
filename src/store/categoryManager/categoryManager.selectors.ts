import { RootState } from "../root.reducers";

const categoryManager = () => {
  return (state: RootState) => {
    return state.categoryManager;
  };
};

export const categoryManagerSelectors = {
  categoryManager,
};
