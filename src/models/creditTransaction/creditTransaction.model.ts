import { CreditPurchaseEnum } from "../../enums/CreditTransaction/creditTransaction.enum";
import { CreditModel } from "../../types/credit/credit.type";
import { UserModel } from "../../types/user.type";
import { UserInfo } from "../user/UserInfo";

type CreditTransactionArgs = {
  credit: CreditModel;
  type: CreditPurchaseEnum;
  user: UserModel;
};

export class CreditTransaction {
  userInfo;
  type;
  creditId;
  creditName;
  creditQuantity;
  packagePrice;
  createdAt = new Date();

  constructor({ credit, type, user }: CreditTransactionArgs) {
    this.userInfo = new UserInfo(user);
    this.type = type;
    this.creditId = credit._id;
    this.creditName = credit.name;
    this.creditQuantity = credit.quantity;
    this.packagePrice = credit.price;
  }
}
