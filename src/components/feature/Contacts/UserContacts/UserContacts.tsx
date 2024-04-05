import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { userSelectors } from "../../../../store/user/user.selectors";
import { timeUtilService } from "../../../../utils/date.utils";
import { userUtilService } from "../../../../utils/user.utils";

type UserContactsProps = {
  title?: string;
};

const UserContacts = ({ title }: UserContactsProps) => {
  const currentUser = useSelector(userSelectors.currentUser());
  const mostRecentDate = userUtilService.getMostRecentObject(
    userUtilService.getContactPurchaseType(currentUser)
  )?.createdAt;

  const userContactTransactions =
    userUtilService.getContactPurchaseType(currentUser);

  return (
    <div className="contact-list--wrapper">
      {userContactTransactions.length > 0 && title && (
        <div className="contact-list__sub-header">
          <span>{title}</span>
          {mostRecentDate && (
            <span>
              {timeUtilService.getFormattedDate(new Date(mostRecentDate))}
            </span>
          )}
        </div>
      )}

      {userContactTransactions.map((contactTransaction, idx) => {
        return <Contact key={idx} contact={contactTransaction.contact} />;
      })}
    </div>
  );
};

export default UserContacts;
