import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { userSelectors } from "../../../../store/user/user.selectors";
import { timeUtilService } from "../../../../utils/date.utils";
import { userUtilService } from "../../../../utils/user.utils";

type UserContactsProps = {
  title?: string;
};

const UserContacts = ({ title = "My Orders" }: UserContactsProps) => {
  const currentUser = useSelector(userSelectors.currentUser());
  const mostRecentDate = userUtilService.getMostRecentObject(
    userUtilService.getContactPurchaseType(currentUser)
  )?.createdAt;

  return (
    <div className="contact-list--wrapper">
      {title && (
        <div className="contact-list__sub-header">
          <span>{title}</span>
          {mostRecentDate && (
            <span>
              {timeUtilService.getFormattedDate(new Date(mostRecentDate))}
            </span>
          )}
        </div>
      )}

      {userUtilService
        .getContactPurchaseType(currentUser)
        .map((contactTransaction, idx) => {
          return <Contact key={idx} contact={contactTransaction.contact} />;
        })}
    </div>
  );
};

export default UserContacts;
