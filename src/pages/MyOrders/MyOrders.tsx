import { TbLetterA } from "react-icons/tb";
import { ROUTES } from "../../constants/routes.constants";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/ui/Breadcrumb";
import UserContacts from "../../components/feature/Contacts/UserContacts/UserContacts";

export const MyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="body-wrapper backgrounds__white-top space-pb--120">
      <Breadcrumb
        pageTitle={"My Orders"}
        Icon={TbLetterA}
        iconClassName={"icon-size-25"}
        onIconClick={() => navigate(ROUTES.AGENT_MESSAGES_PAGE.FULL_ROUTE_NAME)}
      />
      <UserContacts />
    </div>
  );
};
