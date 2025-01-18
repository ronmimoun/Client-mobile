import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { userSelectors } from "../../store/user/user.selectors";
import { useAppDispatch } from "../../store";
import { cartSelectors } from "../../store/cart/cart.selectors";
import { FIXED_PRICE } from "../../constants/values.constants";
import { LoadingButton } from "../../components/ui/LoadingButton/LoadingButton";
import { FaCartArrowDown } from "react-icons/fa";
import { cartActions } from "../../store/cart/cart.actions";
import { ROUTES } from "../../constants/routes.constants";
import ContactInfo from "../../components/feature/Contacts/Contact/ContactInfo";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { UserModel } from "../../types/entities/user.type";

export const Cart = () => {
  const contactCart = useSelector(cartSelectors.cart());
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const getCartTotalPrice = () => {
    if (!contactCart.length) return Number(2).toFixed(FIXED_PRICE);
    return contactCart
      .reduce((acc, contact) => (acc += contact.price), 0)
      .toFixed(2);
  };

  const onRemove = (contactId: string) => {
    dispatch(cartActions.removeFromCart(contactId));
  };

  const onPurchase = async () => {
    setIsLoading(true);
    await dispatch(cartActions.contactPurchase(contactCart));
    setIsLoading(false);
  };

  return (
    <PageLayout title={PAGES_TITLE.CART_PAGE.TITLE_NAME}>
      {contactCart && contactCart.length >= 1 ? (
        <Fragment>
          {contactCart &&
            contactCart.length >= 1 &&
            contactCart.map((contact) => {
              return (
                <div
                  key={contact._id}
                  className="list-product border-bottom--medium"
                >
                  <ContactInfo contact={contact} />

                  <div className="flex align-center gap--25">
                    <div className="list-product__price">
                      <h2>{contact.price}$</h2>
                      <p>22.07.23</p>
                    </div>

                    <button
                      className="list-product__button icon-color__error"
                      onClick={() => onRemove(contact._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              );
            })}

          <div className="grand-total">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h4 className="grand-total-title">
                    Credits: <span>{currentUser.credits}$</span>
                  </h4>
                  <h4 className="grand-total-title">
                    Total Contacts: <span>{contactCart.length}</span>
                  </h4>
                  <h4 className="grand-total-title">
                    Total Price: <span>{getCartTotalPrice()}$</span>
                  </h4>
                  <LoadingButton
                    className={"button button__h-60"}
                    onClick={onPurchase}
                    isLoading={isLoading}
                  >
                    Purchase Contacts
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="no-items-found">
          <div className="no-items-found__image">
            <FaCartArrowDown />
          </div>
          <div className="no-items-found__content">
            <p>
              No Items in the cart.{" "}
              <Link to={ROUTES.HOME_SCREEN.FULL_ROUTE_NAME}>Add Some</Link>
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
