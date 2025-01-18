import { useState } from "react";
import { Credit } from "../../../types/entities/credit/credit.type";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import { CreditTransactionTypeEnum } from "../../../enums/CreditTransaction/creditTransaction.enum";
import { LoadingButton } from "../../ui/LoadingButton/LoadingButton";
import { CreateCreditPaymentRequest } from "../../../types/api/payment/credit/createCreditPayment.type";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";

type CreditPreviewProps = {
  credit: Credit;
};

export const CreditPreview = ({ credit }: CreditPreviewProps) => {
  const currentUserInfo = useSelector(userSelectors.currentUserInfo);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onPurchaseCredit = async (credit: Credit) => {
    setIsLoading(true);

    const createCreditPaymentRequest: CreateCreditPaymentRequest = {
      creditId: credit._id,
      creditName: credit.name,
      creditQuantity: credit.quantity,
      packagePrice: credit.price,
      type: CreditTransactionTypeEnum.CreditPurchase,
      userInfo: currentUserInfo,
    };
    await dispatch(userActions.createCreditPayment(createCreditPaymentRequest));
    setIsLoading(false);
  };

  return (
    <div key={credit._id} className="credit-wrapper mt-3">
      <div className="credit-header">
        <p>{credit.name}</p>
        <p>{credit.price} $</p>
      </div>

      <div className="credit-details_wrapper">
        <div className="credit-details">
          <p>Credits</p>
          <p>{credit.quantity}</p>
        </div>
      </div>

      <div className="credit-footer">
        <p>{credit.description}</p>
        <LoadingButton
          className={"button"}
          isLoading={isLoading}
          onClick={() => onPurchaseCredit(credit)}
        >
          Buy Credits
        </LoadingButton>
      </div>
    </div>
  );
};
