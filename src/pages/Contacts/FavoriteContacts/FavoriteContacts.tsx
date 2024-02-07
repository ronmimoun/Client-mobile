import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { FavoriteIcon } from "../../../components/ui/Icons";
import Contact from "../../../components/feature/Contacts/Contact/Contact";
import PageLayout from "../../../layout/PageLayout";
import { ROUTES } from "../../../constants/routes.constants";

export const FavoriteContacts = () => {
  const currentUser = useSelector(userSelectors.currentUser());

  return (
    <PageLayout title={PAGES_TITLE.FAVORITES_PAGE.TITLE_NAME}>
      <div className="order-product-area">
        {currentUser &&
        currentUser.favorites &&
        currentUser.favorites.length >= 1 ? (
          currentUser.favorites.map((contact) => {
            return <Contact key={contact._id} contact={contact} />;
          })
        ) : (
          <div className="no-items-found">
            <div className="no-items-found__image">
              <FavoriteIcon />
            </div>
            <div className="no-items-found__content">
              <p>
                No Items in the wishlist.{" "}
                <Link to={ROUTES.HOME_SCREEN.FULL_ROUTE_NAME}>Add Some</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
