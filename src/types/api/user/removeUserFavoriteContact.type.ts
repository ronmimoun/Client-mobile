import { UserModel } from "../../entities/user.type";

export type RemoveUserFavoriteContactRequest = {
  contactId: string;
};

export type RemoveUserFavoriteContactResponse = {} & UserModel;
