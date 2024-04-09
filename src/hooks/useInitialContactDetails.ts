import { useSelector } from "react-redux";
import { userSelectors } from "../store/user/user.selectors";
import { UserModel } from "../types/user.type";
import { ContactModel } from "../types/contact/contact.type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { feedbackApiService } from "../services/http/api/feedback.api.service";
import { ContactTransactionType } from "../enums/Contact/ContactTransactionType";
import { contactApiService } from "../services/http/api/contact.api.service";

export const useInitialContactDetails = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [contact, setContact] = useState<ContactModel | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [isGotFeedback, setIsGotFeedback] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    loadContact(id);
  }, []);

  useEffect(() => {
    checkIsOwnedByUser();
  }, [currentUser]);

  useEffect(() => {
    if (!isOwned) return;

    checkIsContactGotFeedback();
  }, [isOwned]);

  const checkIsContactGotFeedback = async () => {
    if (!id) return;

    const feedback = await feedbackApiService.query({
      userId: currentUser._id,
      contactId: id,
    });

    if (!feedback.isSucceeded || !feedback.data?.content) return;

    if (feedback.data.content.length) setIsGotFeedback(true);
    else setIsGotFeedback(false);
  };

  const checkIsOwnedByUser = () => {
    if (currentUser) {
      const isOwned = currentUser.contactTransactions.find(
        (trans) =>
          trans.type === ContactTransactionType.ContactPurchase &&
          trans.contact._id === id
      )
        ? true
        : false;
      setIsOwned(isOwned);
    } else setIsOwned(false);
  };

  const loadContact = async (id: string) => {
    const contactResponse = await contactApiService.getById(id);
    if (!contactResponse.isSucceeded || !contactResponse.data?.content) return;

    loadFavorite(contactResponse.data.content);
    setContact(contactResponse.data.content);
  };

  const loadFavorite = (contact: ContactModel) => {
    if (currentUser) {
      const isFavorite = currentUser.favorites.find(
        (favorite) => favorite._id === contact._id
      );
      if (isFavorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  const addContactAsFavorite = useCallback((value: boolean) => {
    setIsFavorite(value);
  }, []);

  return {
    contact,
    isFavorite,
    isGotFeedback,
    isOwned,
    addContactAsFavorite,
  };
};
