import { useNavigate } from "react-router-dom";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { ROUTES } from "../../constants/routes.constants";
import PageLayout from "../../layout/PageLayout";
import { CreditCards } from "../../components/feature/CreditCards/CreditCards";

export const PaymentMethods = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title={PAGES_TITLE.PAYMENT_METHODS_PAGE.TITLE_NAME}>
      <CreditCards />
      <div className="singel-button--container">
        <button
          className="button button__h-60"
          onClick={() => navigate(ROUTES.ADD_PAYMENT_CARD_PAGE.FULL_ROUTE_NAME)}
        >
          Add new card
        </button>
      </div>
    </PageLayout>
  );
};
