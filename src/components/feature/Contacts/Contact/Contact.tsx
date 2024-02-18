import ContactInfo from "./ContactInfo";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../../store/user/user.selectors";
import { useAppDispatch } from "../../../../store";
import { ContactModel } from "../../../../types/contact/contact.type";
import { userActions } from "../../../../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { GenericResponse } from "../../../../utils/api.utils";
import { ContactIcon } from "../../../ui/Icons";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../../constants/popup.constants";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { cartActions } from "../../../../store/cart/cart.actions";
import { UserModel } from "../../../../types/user.type";

type ContactProps = {
  contact: ContactModel;
  clickContactLink?: string;
};

const Contact = ({ contact, clickContactLink }: ContactProps) => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadFavorite();
  }, []);

  const loadFavorite = () => {
    if (currentUser) {
      const isFavorite = currentUser.favorites.find(
        (favorite) => favorite._id === contact._id
      );
      if (isFavorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  const onAddFavorite = async (item: ContactModel) => {
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

  const addToCart = () => {
    dispatch(cartActions.addToCart(contact));
  };

  const isUserOwnContact = () => {
    if (!currentUser) return;
    const userContact = currentUser.contactTransactions.find(
      (trans) => trans.contact._id === contact._id
    );
    return userContact ? true : false;
  };

  return (
    <div className="list-product border-bottom--medium" key={contact._id}>
      <ContactInfo contact={contact} url={clickContactLink} />

      <div className="list-product__price">
        <h2>{contact.price}$</h2>
      </div>

      <div className="list-product__icon">
        {!isUserOwnContact() && (
          <button className="icon" onClick={addToCart}>
            <ContactIcon />
          </button>
        )}

        <button
          onClick={() =>
            isFavorite ? onRemoveFavorite(contact._id) : onAddFavorite(contact)
          }
        >
          <span
            className={`icon icon-size-small${isFavorite ? " active" : ""}`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
