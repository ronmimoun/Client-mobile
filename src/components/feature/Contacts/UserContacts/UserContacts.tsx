import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { userSelectors } from "../../../../store/user/user.selectors";
import { timeUtilService } from "../../../../utils/date.utils";
import { userUtilService } from "../../../../utils/user.utils";
import { useEffect, useMemo, useState } from "react";
import { ContactModel } from "../../../../types/entities/contact/contact.type";
import { contactApiService } from "../../../../services/http/api/contact.api.service";

type UserContactsProps = {
  title?: string;
};

const UserContacts = ({ title }: UserContactsProps) => {
  const currentUser = useSelector(userSelectors.currentUser());
  const mostRecentDate = userUtilService.getMostRecentObject(
    userUtilService.getContactPurchaseType(currentUser)
  )?.createdAt;

  const [userPurchasedContacts, setUserPurchasedContacts] = useState<
    ContactModel[]
  >([]);

  const userContactTransactions = useMemo(
    () => userUtilService.getContactPurchaseType(currentUser),
    [currentUser]
  );

  const purchasedContactIds = useMemo(
    () =>
      userContactTransactions.map(
        (contactTransaction) => contactTransaction.contactId
      ),
    [userContactTransactions]
  );

  useEffect(() => {
    if (!purchasedContactIds.length) return;

    const getUserPurchasedContacts = async () => {
      const getUserPurchasedContacts =
        await contactApiService.getContactsByIdArray({
          contactsId: purchasedContactIds,
        });

      if (
        !getUserPurchasedContacts.isSucceeded ||
        !getUserPurchasedContacts.data?.content
      )
        return;

      setUserPurchasedContacts(getUserPurchasedContacts.data.content);
    };

    getUserPurchasedContacts();
  }, []);

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

      {userPurchasedContacts.map((contactTransaction, idx) => {
        return <Contact key={idx} contact={contactTransaction} />;
      })}
    </div>
  );
};

export default UserContacts;
