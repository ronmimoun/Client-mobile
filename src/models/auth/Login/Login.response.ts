import { UserModel } from "../../../types/entities/user.type";

export type LoginResponse = {
  user: UserModel;
  jwtToken: string;
};
