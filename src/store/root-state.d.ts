import { CategoryManagerState } from "./categoryManager/categoryManager-state";
import { UserState } from "./user/user-state";

type RootState = {
  user: UserState;
  categoryManager: CategoryManagerState;
  cart: CartState;
  global: GlobalState;
};
