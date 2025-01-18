import ContactInfo from "./ContactInfo";
import { useAppDispatch } from "../../../../store";
import { ContactIcon } from "../../../ui/Icons";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useContactSettings } from "../../../../hooks/useContactSettings";
import { cartActions } from "../../../../store/cart/cart.actions";
import { PresentativeContactType } from "../../../../types/entities/contact/contact.type";

type ContactProps = {
  contact: PresentativeContactType;
  clickContactLink?: string;
};

const Contact = ({ contact, clickContactLink }: ContactProps) => {
  const { isFavorite, isOwned, onAddFavorite, onRemoveFavorite } =
    useContactSettings({ contact });
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(cartActions.addToCart(contact));
  };

  return (
    <div className="list-product border-bottom--medium" key={contact._id}>
      <ContactInfo contact={contact} url={clickContactLink} />

      <div className="list-product__price">
        <h2>{contact.price}$</h2>
      </div>

      <div className="list-product__icon">
        {!isOwned && (
          <button className="icon" onClick={addToCart}>
            <ContactIcon />
          </button>
        )}

        <button
          onClick={() =>
            isFavorite ? onRemoveFavorite(contact._id) : onAddFavorite(contact)
          }
        >
          <span
            className={`icon icon-size-small${isFavorite ? " active" : ""}`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
