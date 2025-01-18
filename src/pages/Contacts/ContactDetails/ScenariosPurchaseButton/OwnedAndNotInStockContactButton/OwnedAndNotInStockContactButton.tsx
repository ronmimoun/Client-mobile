import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../../../store/user/user.selectors";
import { UserModel } from "../../../../../types/entities/user.type";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../../../constants/popup.constants";
import { cartActions } from "../../../../../store/cart/cart.actions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../constants/routes.constants";
import { ContactModel } from "../../../../../types/entities/contact/contact.type";

type OwnedAndNotInStockContactButtonProps = {
  contact: ContactModel;
};

export const OwnedAndNotInStockContactButton = ({
  contact,
}: OwnedAndNotInStockContactButtonProps) => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onRefund = async () => {
    const transaction = currentUser.contactTransactions.find(
      (transaction) => transaction.contact._id === contact._id
    );
    if (!transaction) {
      return toast(POPUP_MESSAGE.GENERAL.SOMETHING_WENT_WRONG);
    }

    dispatch(
      cartActions.contactRefundThunk({
        transactionId: transaction._id,
      })
    );
  };

  const onCommunicateWithAgent = () => {
    navigate(ROUTES.AGENT_MESSAGE_DETAILS_PAGE.FULL_ROUTE_NAME + contact._id);
  };

  return (
    <div className="shop-product-button">
      <button className="button __h-50" onClick={onRefund}>
        Refund contact
      </button>
      {contact.agent && (
        <button
          className="button __h-50 secondary-button"
          onClick={onCommunicateWithAgent}
        >
          Communicate with agent
        </button>
      )}
    </div>
  );
};
