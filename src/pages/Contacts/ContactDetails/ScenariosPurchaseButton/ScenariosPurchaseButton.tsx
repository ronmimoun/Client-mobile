import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactModel } from "../../../../types/contact/contact.type";
import { userSelectors } from "../../../../store/user/user.selectors";
import { useAppDispatch } from "../../../../store";
import { ROUTES } from "../../../../constants/routes.constants";
import { LoadingButton } from "../../../../components/ui/LoadingButton/LoadingButton";
import { userActions } from "../../../../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { GenericResponse } from "../../../../utils/api.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../../constants/popup.constants";
import { cartActions } from "../../../../store/cart/cart.actions";
import { contactApiService } from "../../../../services/http/api/contact.api.service";
import { MESSAGES } from "../../../../constants/messages.constants";
import { UserModel } from "../../../../types/user.type";

type ScenariosPurchaseButtonProps = {
  contact: ContactModel;
  isOwned: boolean;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
};

export const ScenariosPurchaseButton = ({
  contact,
  isOwned,
  isFavorite,
  setIsFavorite,
}: ScenariosPurchaseButtonProps) => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddFavorite = async () => {
    const updatedUser: UserModel = {
      ...currentUser,
      favorites: [...currentUser.favorites, contact],
    };

    const userResponse = (await dispatch(
      userActions.userUpdateThunk(updatedUser)
    )) as PayloadAction<GenericResponse<UserModel>>;

    if (!userResponse.payload.isSucceeded || !userResponse.payload.data) return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.ADDED_TO_FAVORITES);
    setIsFavorite(true);
  };

  const onRemoveFavorite = async () => {
    const updatedUser: UserModel = {
      ...currentUser,
      favorites: currentUser.favorites.filter(
        (favorite) => favorite._id !== contact._id
      ),
    };
    const userResponse = (await dispatch(
      userActions.userUpdateThunk(updatedUser)
    )) as PayloadAction<GenericResponse<UserModel>>;

    if (!userResponse.payload.isSucceeded || !userResponse.payload.data) return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.REMOVED_FROM_FAVORITES);
    setIsFavorite(false);
  };

  const onDownload = useCallback(async () => {
    const response = await contactApiService.sendContactDetailsEmail({
      contactId: contact._id,
    });

    if (!response.isSucceeded) return;

    toast.success(MESSAGES.EMAILS.EMAIL_SENT);
  }, [contact]);

  const onCommunicateWithAgent = () => {
    navigate(ROUTES.AGENT_MESSAGE_DETAILS_PAGE.FULL_ROUTE_NAME + contact._id);
  };

  const onPurchase = async () => {
    setIsLoading(true);
    await dispatch(userActions.singleContactPurchase(contact));
    setIsLoading(false);
  };

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

  if (contact.inStock && isOwned) {
    return (
      <div className="shop-product-button">
        <button className="button __h-50" onClick={onDownload}>
          Download
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
  } else if (!isOwned && isFavorite) {
    return (
      <div className="shop-product-button">
        <LoadingButton
          className={"button __h-50"}
          isLoading={isLoading}
          onClick={onPurchase}
        >
          Purchase Contact
        </LoadingButton>
        <button
          className="button __h-50 secondary-button"
          onClick={onRemoveFavorite}
        >
          Remove from favorites
        </button>
      </div>
    );
  } else if (!isOwned && !isFavorite) {
    return (
      <div className="shop-product-button">
        <LoadingButton
          className={"button __h-50"}
          isLoading={isLoading}
          onClick={onPurchase}
        >
          Purchase Contact
        </LoadingButton>
        <button
          className="button __h-50 secondary-button"
          onClick={onAddFavorite}
        >
          Add to favorites
        </button>
      </div>
    );
  } else if (isOwned && !contact.inStock) {
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
  } else return null;
};
