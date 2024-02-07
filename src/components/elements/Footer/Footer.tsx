import React from "react";
import { NavLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { ROUTES } from "../../../constants/routes.constants";
import { HomeIcon } from "../../ui/Icons";
import { CartIcon } from "../../ui/Icons/CartIcon";
import Badge from "../../ui/Badge/Badge";
import { BellIcon } from "../../ui/Icons/BellIcon";
import { useSelector } from "react-redux";
import { cartSelectors } from "../../../store/cart/cart.selectors";
import { IoChatboxOutline } from "react-icons/io5";

type FooterIcon = {
  link: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  badgeNum?: number;
};

const Footer = () => {
  const cart = useSelector(cartSelectors.cart());

  const footerArray: FooterIcon[] = [
    { link: ROUTES.USER_EDIT_PROFILE_PAGE.FULL_ROUTE_NAME, icon: FiSettings },
    { link: ROUTES.HOME_SCREEN.FULL_ROUTE_NAME, icon: () => <HomeIcon /> },
    {
      link: ROUTES.CART_PAGE.FULL_ROUTE_NAME,
      icon: () => <CartIcon />,
      badgeNum: cart.length,
    },
    {
      link: ROUTES.CHAT_PAGE.FULL_ROUTE_NAME,
      icon: () => <IoChatboxOutline />,
    },
    {
      link: ROUTES.NOTIFICATION_PAGE.FULL_ROUTE_NAME,
      icon: () => <BellIcon />,
    },
  ];

  return (
    <footer>
      <div className="footer-nav-wrapper footer-nav-wrapper--styleTwo">
        {footerArray.map((item, idx) => {
          return (
            <NavLink
              key={idx}
              to={item.link}
              className={({ isActive }) =>
                `footer-nav-single footer-nav-single--styleTwo ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div className="menu-wrapper">
                <Badge number={item.badgeNum}>
                  <item.icon />
                </Badge>
              </div>
            </NavLink>
          );
        })}
      </div>
    </footer>
  );
};
export default Footer;
