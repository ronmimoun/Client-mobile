import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { timeUtilService } from "../../../utils/date.utils";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import PageLayout from "../../../layout/PageLayout";

export const UserCreditsHistory = () => {
  const currentUser = useSelector(userSelectors.currentUser());

  return (
    <PageLayout title={PAGES_TITLE.USER_CREDIT_HISTORY_PAGE.TITLE_NAME}>
      <ul className="flex f-dir-col gap--10">
        {currentUser &&
          currentUser.creditTransactions.map((trans) => {
            return (
              <li key={trans._id} className="credit-history__item">
                <div className="credit-history__item__details">
                  <h6>{trans.creditName}</h6>
                  <p>
                    {timeUtilService.formatTimestamp(new Date(trans.createdAt))}
                  </p>
                </div>

                <div className="credit-history__item__info">
                  <p className="credit-history__item__quantity">
                    {trans.creditQuantity} Credits
                  </p>
                  <p className="credit-history__item__price">
                    ${trans.packagePrice}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </PageLayout>
  );
};
