import { UserInfo } from "../../types/entities/user.type";
import { RootState } from "../root.reducers";

const currentUser = () => {
  return (state: RootState) => {
    return state.user.currentUser;
  };
};
const currentUserId = (state: RootState): string | undefined =>
  state.user.currentUser?._id;
const currentUserInfo = (state: RootState): UserInfo => ({
  fullname: state.user.currentUser?.fullname,
  userId: state.user.currentUser?._id,
  imgUrl: state.user.currentUser?.imgUrl,
});

export const userSelectors = {
  currentUser,
  currentUserId,
  currentUserInfo,
};
