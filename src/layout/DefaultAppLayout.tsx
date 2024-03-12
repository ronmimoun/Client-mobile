import { Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import STYLES from "../constants/style.constants";
import Header from "../components/elements/Header/Header";
import Footer from "../components/elements/Footer/Footer";
import { useAppDispatch } from "../store";
import { useEffect } from "react";
import { globalActions } from "../store/global/global.actions";

interface DefaultAppLayout {
  children: JSX.Element;
}

const DefaultAppLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const backgroundPages = [
    ROUTES.HOME_PAGE.FULL_ROUTE_NAME,
    ROUTES.MY_ORDERS_PAGE.FULL_ROUTE_NAME,
    ROUTES.HOME_SCREEN.FULL_ROUTE_NAME,
    ROUTES.USER_EDIT_PROFILE_PAGE.FULL_ROUTE_NAME,
    ROUTES.NOTIFICATION_PAGE.FULL_ROUTE_NAME,
    ROUTES.USER_CREDIT_HISTORY_PAGE.FULL_ROUTE_NAME,
    ROUTES.CATEGORIES_PAGE.FULL_ROUTE_NAME,
    ROUTES.PAYMENT_METHODS_PAGE.FULL_ROUTE_NAME,
    ROUTES.ADD_PAYMENT_CARD_PAGE.FULL_ROUTE_NAME,
    ROUTES.FAVORITES_CONTACTS_PAGE.FULL_ROUTE_NAME,
    ROUTES.CONTACT_US_PAGE.FULL_ROUTE_NAME,
    ROUTES.CONTACT_DETAILS_PAGE.FULL_ROUTE_NAME + id,
    ROUTES.CONTACTS_RECOMMANDED_PAGE.FULL_ROUTE_NAME,
    ROUTES.CONTACTS_INCOME_PAGE.FULL_ROUTE_NAME,
    ROUTES.CART_PAGE.FULL_ROUTE_NAME,
    ROUTES.AGENT_MESSAGES_PAGE.FULL_ROUTE_NAME,
    ROUTES.AGENT_MESSAGE_DETAILS_PAGE.FULL_ROUTE_NAME + id,
    ROUTES.FEEDBACK_PAGE.FULL_ROUTE_NAME + id,
    ROUTES.CHAT_PAGE.FULL_ROUTE_NAME,
    ROUTES.CREDITS_PAGE.FULL_ROUTE_NAME,
    ROUTES.ALL_CONTACTS_PAGE.FULL_ROUTE_NAME,
    ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME,
    ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME + "/" + id,
    ROUTES.AI_CHAT_PAGE.FULL_ROUTE_NAME,
  ];

  useEffect(() => {
    const initThunkAsync = async () => {
      await dispatch(globalActions.globalInitThunk());
    };
    initThunkAsync();
  }, []);

  const ColorHeader = () => {
    const isWithBackground = backgroundPages.includes(location.pathname);
    if (isWithBackground) {
      return (
        <div className={STYLES.BACKGROUND_COLOR.BODY_GRADIENT}>
          <Header />
          <Outlet />
        </div>
      );
    } else {
      return (
        <>
          <div className={STYLES.BACKGROUND_COLOR.BODY_GRADIENT}>
            <Header />
          </div>
          <Outlet />
        </>
      );
    }
  };

  return (
    <>
      <ColorHeader />
      <Footer />
    </>
  );
};

export default DefaultAppLayout;
