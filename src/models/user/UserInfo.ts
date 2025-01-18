import { UserModel } from "../../types/entities/user.type";

export class UserInfo {
  userId;
  imgUrl;
  fullname;

  constructor(user: UserModel) {
    this.userId = user._id;
    this.imgUrl = user.imgUrl;
    this.fullname = user.fullname;
  }
}
