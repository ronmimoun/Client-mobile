import { UserModel } from "../../../types/user.type";

export type LoginResponse = {
  user: UserModel;
  jwtToken: string;
};
