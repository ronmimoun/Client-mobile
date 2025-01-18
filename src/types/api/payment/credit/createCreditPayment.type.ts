import { UserInfo, UserModel } from "../../../entities/user.type";

export type CreateCreditPaymentRequest = {
  type: string;
  creditId: string;
  creditName: string;
  creditQuantity: number;
  packagePrice: number;
  userInfo: UserInfo;
};

export type CreateCreditPaymentResponse = {} & UserModel;
