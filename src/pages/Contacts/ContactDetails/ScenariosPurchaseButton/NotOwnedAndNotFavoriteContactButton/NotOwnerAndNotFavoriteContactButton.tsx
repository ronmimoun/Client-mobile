import { useState } from "react";
import { ContactModel } from "../../../../../types/contact/contact.type";
import { LoadingButton } from "../../../../../components/ui/LoadingButton/LoadingButton";
import { useAppDispatch } from "../../../../../store";
import { userActions } from "../../../../../store/user/user.actions";

type NotOwnerAndNotFavoriteContactButtonProps = {
  contact: ContactModel;
  secondaryButtonCb: (contactId: ContactModel) => void;
};

export const NotOwnerAndNotFavoriteContactButton = ({
  contact,
  secondaryButtonCb,
}: NotOwnerAndNotFavoriteContactButtonProps) => {
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
        onClick={() => secondaryButtonCb(contact)}
      >
        Add to favorites
      </button>
    </div>
  );
};
