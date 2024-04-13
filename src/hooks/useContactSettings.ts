import { useSelector } from "react-redux";
import { userSelectors } from "../store/user/user.selectors";
import { UserModel } from "../types/user.type";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { PresentativeContactType } from "../types/contact/contact.type";
import { userActions } from "../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { GenericResponse } from "../utils/api.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../constants/popup.constants";

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
    const updatedUser: UserModel = {
      ...currentUser,
      favorites: [...currentUser.favorites, item],
    };

    const userResponse = (await dispatch(
      userActions.userUpdateThunk(updatedUser)
    )) as PayloadAction<GenericResponse<UserModel>>;

    if (!userResponse.payload.isSucceeded || !userResponse.payload.data) return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.ADDED_TO_FAVORITES);
    setIsFavorite(true);
  };

  const onRemoveFavorite = async (itemId: string) => {
    const updatedUser: UserModel = {
      ...currentUser,
      favorites: currentUser.favorites.filter(
        (favorite) => favorite._id !== itemId
      ),
    };
    const userResponse = (await dispatch(
      userActions.userUpdateThunk(updatedUser)
    )) as PayloadAction<GenericResponse<UserModel>>;

    if (!userResponse.payload.isSucceeded || !userResponse.payload.data) return;

    toast(POPUP_MESSAGE.CONTACT.FAVORITES.REMOVED_FROM_FAVORITES);
    setIsFavorite(false);
  };

  const isUserOwnContact = (): boolean => {
    if (!currentUser) return false;
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
