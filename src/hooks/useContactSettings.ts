import { useSelector } from "react-redux";
import { userSelectors } from "../store/user/user.selectors";
import { UserModel } from "../types/entities/user.type";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { userActions } from "../store/user/user.actions";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../constants/popup.constants";
import { PresentativeContactType } from "../types/entities/contact/contact.type";
import { ApiResponse } from "../models/base/api-base";
import { AddUserFavoriteContactResponse } from "../types/api/user/addUserFavoriteContact.type";
import { RemoveUserFavoriteContactResponse } from "../types/api/user/removeUserFavoriteContact.type";

type useContactSettingsProps = {
  contact: PresentativeContactType;
};

export const useContactSettings = ({ contact }: useContactSettingsProps) => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser) return;

    setIsOwned(isUserOwnContact());
    loadFavorite();
  }, [currentUser]);

  const loadFavorite = () => {
    if (currentUser) {
      const isFavorite = currentUser.favorites.find(
        (favorite) => favorite._id === contact._id
      );
      if (isFavorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  const onAddFavorite = async (item: PresentativeContactType) => {
    const addUserFavoriteContactResponse = (
      await dispatch(
        userActions.addUserFavoriteContactThunk({
          presentativeContact: item,
        })
      )
    ).payload as ApiResponse<AddUserFavoriteContactResponse>;

    if (
      !addUserFavoriteContactResponse.isSucceeded ||
      !addUserFavoriteContactResponse.data?.content
    )
      return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.ADDED_TO_FAVORITES);
    setIsFavorite(true);
  };

  const onRemoveFavorite = async (itemId: string) => {
    const userResponse = (
      await dispatch(
        userActions.removeUserFavoriteContactThunk({ contactId: itemId })
      )
    ).payload as ApiResponse<RemoveUserFavoriteContactResponse>;

    if (!userResponse.isSucceeded || !userResponse.data?.content) return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.REMOVED_FROM_FAVORITES);
    setIsFavorite(false);
  };

  const isUserOwnContact = (): boolean => {
    if (!currentUser || !currentUser.contactTransactions.length) return false;
    console.log("currentUser", currentUser);
    const userContact = currentUser.contactTransactions.find(
      (trans) => trans.contact._id === contact._id
    );
    return !!userContact;
  };

  return {
    onAddFavorite,
    onRemoveFavorite,
    isFavorite,
    isOwned,
  };
};
