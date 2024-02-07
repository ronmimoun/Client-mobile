import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelectors } from "../../../store/user/user.selectors";
import { ROUTES } from "../../../constants/routes.constants";
import { PlusCreditIcon } from "../../ui/Icons/PlusCreditIcon";

type NavLink = {
  url: string;
  icon: JSX.Element;
  class?: string;
};

export const WalletCard = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const navigate = useNavigate();

  const onCredits = () => {
    navigate(ROUTES.CREDITS_PAGE.FULL_ROUTE_NAME);
  };

  const links: NavLink[] = [
    {
      url: ROUTES.MY_ORDERS_PAGE.FULL_ROUTE_NAME,
      icon: <AiOutlineArrowDown />,
    },
    {
      url: ROUTES.CONTACTS_INCOME_PAGE.FULL_ROUTE_NAME,
      icon: <AiOutlineArrowUp />,
    },
    {
      url: ROUTES.CONTACTS_RECOMMANDED_PAGE.FULL_ROUTE_NAME,
      icon: <AiOutlineStar />,
    },
    {
      url: ROUTES.FAVORITES_CONTACTS_PAGE.FULL_ROUTE_NAME,
      icon: <MdOutlineFavoriteBorder />,
    },
    {
      url: ROUTES.CREDITS_PAGE.FULL_ROUTE_NAME,
      icon: <AiOutlinePlus />,
      class: "plus",
    },
  ];

  return (
    <div className="wallet-card-section">
      <div className="wallet-card">
        <div className="balance">
          <div className="left">
            <h2 className="title">
              Credits
              <span className="title__icon">
                <PlusCreditIcon />
              </span>
            </h2>
            <h1 className="total" onClick={onCredits}>
              {currentUser?.credits}$
            </h1>
          </div>
        </div>
        <div className="wallet-footer scrollable-wrapper">
          {links.map((link) => {
            return (
              <div className="item" key={link.url}>
                <Link to={link.url}>
                  <div className={`icon-wrapper ${link?.class || ""}`}>
                    {link.icon}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
