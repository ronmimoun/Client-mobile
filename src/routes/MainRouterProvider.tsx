import DefaultAppLayout from "../layout/DefaultAppLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../store/user/user.selectors";
import "react-toastify/dist/ReactToastify.css";

// Pages:
import { FavoriteContacts } from "../pages/Contacts/FavoriteContacts/FavoriteContacts";
import { RecommandedContacts } from "../pages/Contacts/RecommandedContacts/RecommandedContacts";
import { Income } from "../pages/Income/Income";
import { MyOrders } from "../pages/MyOrders/MyOrders";
import { ContactsByCategoryPage } from "../pages/Contacts/ContactsByCategoryPage/ContactsByCategoryPage";
import { Home } from "../pages/Home/Home";
import { UserEditProfile } from "../pages/User/UserEditProfile/UserEditProfile";
import { UserProfile } from "../pages/User/UserProfile/UserProfile";
import { Notifications } from "../pages/Notifications/Notifications";
import { UserCreditsHistory } from "../pages/User/UserCreditHistory/UserCreditHistory";
import Categories from "../pages/Categories/Categories";
import { PaymentMethods } from "../pages/PaymentMethods/PaymentMethods";
import { ContactUs } from "../pages/ContactUs/ContactUs";
import ContactDetails from "../pages/Contacts/ContactDetails/ContactDetails";
import { AddPaymentCard } from "../pages/AddPaymentCard/AddPaymentCard";
import { ToastProvider } from "../components/provider/ToastProvider";
import { Cart } from "../pages/Cart/Cart";
import { AgentMessages } from "../pages/Agent/AgentMessages/AgentMessages";
import AgentMessageDetails from "../pages/Agent/AgentMessageDetails/AgentMessageDetails";
import { Feedback } from "../pages/Feedback/Feedback";
import { SupportChat } from "../pages/SupportChat/SupportChat";
import { Register } from "../pages/Register/Register";
import { Login } from "../pages/Login/Login";
import { Credits } from "../pages/Credit/Credits";
import AllContacts from "../pages/AllContacts/AllContacts";
import WeAreLookingForList from "../pages/WeAreLookingFor/WeAreLookingForList";
import WeAreLookingForForm from "../pages/WeAreLookingFor/WeAreLookingForForm";

const RoutesWrapper = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate(ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME);
  }, []);

  return (
    <>
      <Outlet />
      <ToastProvider />
    </>
  );
};

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.BASE} element={<RoutesWrapper />}>
      <Route path={ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME} element={<Login />} />

      <Route
        path={ROUTES.REGISTER_PAGE.FULL_ROUTE_NAME}
        element={<Register />}
      />

      <Route path={ROUTES.BASE} element={<DefaultAppLayout />}>
        <Route path={ROUTES.HOME_SCREEN.FULL_ROUTE_NAME} element={<Home />} />
        <Route
          path={ROUTES.CONTACTS_PAGE.CONTACT_CATEGORY_FULL_ROUTE_NAME}
          element={<ContactsByCategoryPage />}
        />
        <Route
          path={ROUTES.MY_ORDERS_PAGE.FULL_ROUTE_NAME}
          element={<MyOrders />}
        />
        <Route
          path={ROUTES.CONTACTS_INCOME_PAGE.FULL_ROUTE_NAME}
          element={<Income />}
        />
        <Route
          path={ROUTES.CONTACTS_RECOMMANDED_PAGE.FULL_ROUTE_NAME}
          element={<RecommandedContacts />}
        />
        <Route
          path={ROUTES.FAVORITES_CONTACTS_PAGE.FULL_ROUTE_NAME}
          element={<FavoriteContacts />}
        />
        <Route
          path={ROUTES.CREDITS_PAGE.FULL_ROUTE_NAME}
          element={<Credits />}
        />
        <Route
          path={ROUTES.USER_EDIT_PROFILE_PAGE.FULL_ROUTE_NAME}
          element={<UserEditProfile />}
        />
        <Route
          path={ROUTES.USER_PROFILE_PAGE.FULL_ROUTE_NAME}
          element={<UserProfile />}
        />
        <Route
          path={ROUTES.NOTIFICATION_PAGE.FULL_ROUTE_NAME}
          element={<Notifications />}
        />
        <Route
          path={ROUTES.USER_CREDIT_HISTORY_PAGE.FULL_ROUTE_NAME}
          element={<UserCreditsHistory />}
        />
        <Route
          path={ROUTES.CATEGORIES_PAGE.FULL_ROUTE_NAME}
          element={<Categories />}
        />
        <Route
          path={ROUTES.PAYMENT_METHODS_PAGE.FULL_ROUTE_NAME}
          element={<PaymentMethods />}
        />
        <Route
          path={ROUTES.CONTACT_US_PAGE.FULL_ROUTE_NAME}
          element={<ContactUs />}
        />
        <Route
          path={ROUTES.CONTACT_DETAILS_PAGE.PATH_NAME}
          element={<ContactDetails />}
        />
        <Route
          path={ROUTES.ADD_PAYMENT_CARD_PAGE.FULL_ROUTE_NAME}
          element={<AddPaymentCard />}
        />
        <Route
          path={ROUTES.AGENT_MESSAGES_PAGE.FULL_ROUTE_NAME}
          element={<AgentMessages />}
        />
        <Route
          path={ROUTES.AGENT_MESSAGE_DETAILS_PAGE.PATH_NAME}
          element={<AgentMessageDetails />}
        />
        <Route
          path={ROUTES.CHAT_PAGE.FULL_ROUTE_NAME}
          element={<SupportChat />}
        />
        <Route
          path={ROUTES.ALL_CONTACTS_PAGE.FULL_ROUTE_NAME}
          element={<AllContacts />}
        />
        <Route
          path={ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME}
          element={<WeAreLookingForList />}
        />
        <Route
          path={ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME}
          element={<WeAreLookingForList />}
        />
        <Route
          path={ROUTES.WE_ARE_LOOKING_FOR_PAGE.PATH_NAME}
          element={<WeAreLookingForForm />}
        />
        <Route path={ROUTES.FEEDBACK_PAGE.PATH_NAME} element={<Feedback />} />
        <Route path={ROUTES.CART_PAGE.FULL_ROUTE_NAME} element={<Cart />} />
      </Route>
    </Route>
  )
);

export const MainRouterProvider = () => {
  return <RouterProvider router={mainRouter} />;
};
