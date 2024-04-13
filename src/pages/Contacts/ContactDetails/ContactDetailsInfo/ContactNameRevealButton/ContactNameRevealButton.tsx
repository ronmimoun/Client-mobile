import classes from "./ContactNameRevealButton.module.scss";
import { BsEyeFill } from "react-icons/bs";
import { combineClassNames } from "../../../../../utils/formatters.utils";
import { ButtonIconBase } from "../../../../../components/ui/buttons/ButtonIconBase/ButtonIconBase";
import { RenderByBooleanWrapper } from "../../../../../components/utils/RenderByBooleanWrapper/RenderByBooleanWrapper";
import { useCallback, useMemo } from "react";
import { userApiService } from "../../../../../services/http/api/user.api.service";
import { ContactModel } from "../../../../../types/contact/contact.type";
import { createPresentativeContact } from "../../../../../utils/contact.utils";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../../../store/user/user.selectors";
import { useAppDispatch } from "../../../../../store";
import { userActions } from "../../../../../store/user/user.actions";

type ContactNameRevealButtonProps = {
  contact: ContactModel;
  isOwned: boolean;
};

export const ContactNameRevealButton = ({
  contact,
  isOwned,
}: ContactNameRevealButtonProps) => {
  const currentUser = useSelector(userSelectors.currentUser());
  const dispatch = useAppDispatch();

  const onRevealContactName = useCallback(async () => {
    const payload = {
      revealCount: calcRevealCount(),
      contactRevealed: createPresentativeContact(contact),
    };

    const response = await userApiService.updateUserContactDisclosure(payload);
    if (!response.isSucceeded || !response.data?.content) return;

    dispatch(userActions.setCurrentUser(response.data.content));
  }, [currentUser?.contactDisclosure]);

  const calcRevealCount = useCallback((): number => {
    if (!currentUser) return 0;

    if (currentUser?.contactDisclosure.revealCount === 0) return 0;
    else if (!Number.isInteger(currentUser?.contactDisclosure.revealCount))
      return 0;
    return currentUser.contactDisclosure.revealCount - 1;
  }, [currentUser]);

  const isNameRevealed = useMemo((): boolean => {
    if (isOwned) return true;

    return !!currentUser?.contactDisclosure.contactsRevealed.find(
      (revealedContact) => revealedContact._id === contact._id
    );
  }, [currentUser]);

  return (
    <div className={combineClassNames([classes.container])}>
      <h3 className={classes.container__title}>Name:</h3>

      <div className={classes.container__text_wrapper}>
        <RenderByBooleanWrapper shouldRender={isNameRevealed}>
          <p className={classes.container__text}>
            {contact.name} {contact.familyName}
          </p>
        </RenderByBooleanWrapper>

        <RenderByBooleanWrapper shouldRender={!isNameRevealed}>
          <p className={classes.container__text}>XXXX XXXX</p>
          <ButtonIconBase
            className={classes.container__button}
            onClick={onRevealContactName}
          >
            <p className={classes.container__counter}>
              {currentUser?.contactDisclosure.revealCount}
            </p>
            <BsEyeFill />
          </ButtonIconBase>
        </RenderByBooleanWrapper>
      </div>
    </div>
  );
};
