import { useSelector } from "react-redux";
import PageLayout from "../../../layout/PageLayout";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { userSelectors } from "../../../store/user/user.selectors";
import ContactInfo from "../../../components/feature/Contacts/Contact/ContactInfo";
import { timeUtilService } from "../../../utils/date.utils";
import { ROUTES } from "../../../constants/routes.constants";
import { UserModel } from "../../../types/user.type";

export const AgentMessages = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;

  return (
    <PageLayout title={PAGES_TITLE.AGENT_DETAILS_PAGE.TITLE_NAME}>
      {currentUser.agentMessages.map((message) => {
        return (
          <div key={message._id} className="list-product border-bottom--medium">
            <ContactInfo
              contact={message.contact}
              url={ROUTES.AGENT_MESSAGE_DETAILS_PAGE.FULL_ROUTE_NAME}
            />

            <div className="list-product__price gap--15">
              <h2>{message.contact.price}$</h2>
              <p>
                {timeUtilService.getFormattedDate(new Date(message.createdAt))}
              </p>
            </div>
          </div>
        );
      })}
    </PageLayout>
  );
};
