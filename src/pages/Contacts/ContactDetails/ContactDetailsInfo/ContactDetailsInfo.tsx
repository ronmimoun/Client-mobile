import classes from "./ContactDetailsInfo.module.scss";
import { RenderByBooleanWrapper } from "../../../../components/utils/RenderByBooleanWrapper/RenderByBooleanWrapper";
import { ContactModel } from "../../../../types/contact/contact.type";
import { textUtilService } from "../../../../utils/text.utils";
import { Mailto } from "../../../../components/ui/MailTo/MailTo";
import { ContactNameRevealButton } from "./ContactNameRevealButton/ContactNameRevealButton";

type ContactDetailsInfoProps = {
  contact: ContactModel;
  isOwned: boolean;
};

export const ContactDetailsInfo = ({
  isOwned,
  contact,
}: ContactDetailsInfoProps) => {
  return (
    <div className={classes.container}>
      <ContactNameRevealButton contact={contact} isOwned={isOwned} />

      <RenderByBooleanWrapper shouldRender={isOwned}>
        <div className="flex gap--15">
          <h3 className={classes.container__title}>Country:</h3>
          <RenderByBooleanWrapper shouldRender={!!contact.country}>
            <p className={classes.container__info}>
              {textUtilService.getFirstLetterUppercase(contact.country!)}
            </p>
          </RenderByBooleanWrapper>
        </div>
      </RenderByBooleanWrapper>

      <div className="flex gap--15">
        <h3 className={classes.container__title}>Category:</h3>
        <p className={classes.container__info}>{contact.category}</p>
      </div>

      <div className="flex gap--15">
        <h3 className={classes.container__title}>Company:</h3>
        <p className={classes.container__info}>{contact.company}</p>
      </div>

      <div className="flex gap--15">
        <h3 className={classes.container__title}>Job Title:</h3>
        <p className={classes.container__info}>{contact.jobTitle}</p>
      </div>

      <RenderByBooleanWrapper
        shouldRender={contact.emails.length > 0 && isOwned}
      >
        <div className="flex gap--15">
          <h3 className={classes.container__title}>Mail:</h3>
          <Mailto email={contact.emails[0]?.emailUrl}>
            {contact.emails[0]?.emailUrl}
          </Mailto>
        </div>
      </RenderByBooleanWrapper>

      <RenderByBooleanWrapper shouldRender={isOwned}>
        <div className="flex gap--15">
          <h3 className={classes.container__title}>Mobile:</h3>
          <p className={classes.container__info}>{contact.mobile}</p>
        </div>
      </RenderByBooleanWrapper>

      <RenderByBooleanWrapper shouldRender={!!contact.linkedinLink && isOwned}>
        <div className="fold_text">
          <h3 className={classes.container__title}>Linkedin:</h3>
          <p className={classes.container__info}>{contact.linkedinLink}</p>
        </div>
      </RenderByBooleanWrapper>
    </div>
  );
};
