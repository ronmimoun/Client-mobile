import { PresentativeContactType } from "../../entities/contact/contact.type";
import { UserModel } from "../../entities/user.type";

export type AddUserFavoriteContactRequest = {
  presentativeContact: PresentativeContactType;
};

export type AddUserFavoriteContactResponse = {} & UserModel;
