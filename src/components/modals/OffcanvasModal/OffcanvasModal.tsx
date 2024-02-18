import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdHistory } from "react-icons/md";
import { userSelectors } from "../../../store/user/user.selectors";
import { elementUtilService } from "../../../utils/element.utils";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { ROUTES } from "../../../constants/routes.constants";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import {
  ArrowIcon,
  ChatIcon,
  CreditCardIcon,
  FavoriteIcon,
  LoginIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  UserProfileIcon,
  CartIcon,
} from "../../ui/Icons";
import { IoIosContact } from "react-icons/io";
import { MdOutlineJoinInner } from "react-icons/md";
import { userUtilService } from "../../../utils/user.utils";
import { UserModel } from "../../../types/user.type";

type OffcanvasModalProps = {
  activeStatus: (status: boolean) => void;
  show: boolean;
  onClose: () => void;
};

const OffcanvasModal = ({
  activeStatus,
  show,
  onClose,
}: OffcanvasModalProps) => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const offcanvasNavigations = document.querySelectorAll(
      ".offcanvas-navigation > li"
    );
    offcanvasNavigations.forEach((single) => {
      single.addEventListener("click", () => {
        activeStatus(false);
      });
    });
  }, []);

  useEffect(() => {
    if (show) elementUtilService.ignoreBodyScroll(true);
    else elementUtilService.ignoreBodyScroll(false);
  }, [show]);

  const onLogout = async () => {
    dispatch(userActions.logoutThunk());
  };

  return (
    <div className={`offcanvas-menu ${show ? "active body-gradient" : ""}`}>
      <div className="flex justify-space mt-3">
        <span
          onClick={onClose}
          className="icon-color__white--two cursor__pointer"
        >
          <ArrowIcon />
        </span>
        <span className="offcanvas-menu__icon">
          <SearchIcon />
        </span>
      </div>

      <div className="profile-card text-center mt-3">
        <div className="profile-card__image space-mb--10">
          <img src={currentUser?.imgUrl?.url || DUMMY_USER_URL} alt="" />
        </div>
        <div className="profile-card__content">
          <p>{currentUser?.fullname}</p>
        </div>
      </div>

      <div className="offcanvas-navigation-wrapper space-mt--40">
        <ul className="offcanvas-navigation">
          <li className="flex justify-space">
            <div onClick={onLogout} className="flex align-center">
              <span className="__icon">
                <LoginIcon />
              </span>
              <p>Logout</p>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon icon-color__white--two">
                <UserProfileIcon />
              </span>
              <Link to={ROUTES.USER_PROFILE_PAGE.FULL_ROUTE_NAME}>
                My Profile
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <MdHistory />
              </span>
              <Link to={ROUTES.USER_CREDIT_HISTORY_PAGE.FULL_ROUTE_NAME}>
                Credit History
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <ShareIcon />
              </span>
              <Link to={ROUTES.CREDIT_PAGE.FULL_ROUTE_NAME}>Credits</Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon icon-color__white--two">
                <CreditCardIcon />
              </span>
              <Link to={ROUTES.PAYMENT_METHODS_PAGE.FULL_ROUTE_NAME}>
                Payment Methods
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <ChatIcon />
              </span>
              <Link to={ROUTES.MY_ORDERS_PAGE.FULL_ROUTE_NAME}>My Orders</Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <CartIcon />
              </span>
              <Link to={ROUTES.CART_PAGE.FULL_ROUTE_NAME}>Cart</Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <FavoriteIcon />
              </span>
              <Link to={ROUTES.FAVORITES_CONTACTS_PAGE.FULL_ROUTE_NAME}>
                Favorites
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          {userUtilService.isAgent(currentUser) && (
            <li className="flex justify-space">
              <div className="flex align-center">
                <span className="__icon">
                  <MdOutlineJoinInner />
                </span>
                <Link to={ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME}>
                  We Are Looking For
                </Link>
              </div>
              <ArrowIcon className="offcanvas-menu__icon rotate_180" />
            </li>
          )}

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <SettingsIcon />
              </span>
              <Link to={ROUTES.USER_EDIT_PROFILE_PAGE.FULL_ROUTE_NAME}>
                Settings
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>

          <li className="flex justify-space">
            <div className="flex align-center">
              <span className="__icon">
                <IoIosContact />
              </span>
              <Link to={ROUTES.CONTACT_US_PAGE.FULL_ROUTE_NAME}>
                Contact Us
              </Link>
            </div>
            <ArrowIcon className="offcanvas-menu__icon rotate_180" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffcanvasModal;
