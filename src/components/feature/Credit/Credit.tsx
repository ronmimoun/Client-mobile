import { useState } from "react";
import { CreditModel } from "../../../types/credit/credit.type";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import { CreditPurchaseEnum } from "../../../enums/CreditTransaction/creditTransaction.enum";
import { LoadingButton } from "../../ui/LoadingButton/LoadingButton";

type CreditProps = {
  credit: CreditModel;
};

export const Credit = ({ credit }: CreditProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onPurchaseCredit = async (credit: CreditModel) => {
    setIsLoading(true);
    await dispatch(
      userActions.creditPurchase({
        credit,
        type: CreditPurchaseEnum.CreditPurchase,
      })
    );
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

export default Credit;
