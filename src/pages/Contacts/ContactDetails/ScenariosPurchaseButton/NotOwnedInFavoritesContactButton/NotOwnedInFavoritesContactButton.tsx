import { useState } from "react";
import { LoadingButton } from "../../../../../components/ui/LoadingButton/LoadingButton";
import { useAppDispatch } from "../../../../../store";
import { userActions } from "../../../../../store/user/user.actions";
import { ContactModel } from "../../../../../types/entities/contact/contact.type";

type NotOwnedInFavoritesContactButtonProps = {
  contact: ContactModel;
  secondaryButtonCb: (contactId: string) => void;
};

export const NotOwnedInFavoritesContactButton = ({
  contact,
  secondaryButtonCb,
}: NotOwnedInFavoritesContactButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onPurchase = async () => {
    setIsLoading(true);
    await dispatch(userActions.singleContactPurchase(contact));
    setIsLoading(false);
  };

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
        onClick={() => secondaryButtonCb(contact._id)}
      >
        Remove from favorites
      </button>
    </div>
  );
};
