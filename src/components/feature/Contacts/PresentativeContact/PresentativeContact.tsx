import classes from "./PresentativeContact.module.scss";
import ContactInfo from "../Contact/ContactInfo";
import { PresentativeContactType } from "../../../../types/contact/contact.type";
import { useContactSettings } from "../../../../hooks/useContactSettings";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { combineClassNames } from "../../../../utils/formatters.utils";

type PresentativeContactProps = {
  contact: PresentativeContactType;
};

export const PresentativeContact = ({ contact }: PresentativeContactProps) => {
  const { isFavorite, onAddFavorite, onRemoveFavorite } = useContactSettings({
    contact,
  });

  return (
    <div
      className={combineClassNames([
        "border-bottom--medium",
        classes.container,
      ])}
    >
      <ContactInfo contact={contact} />

      <div className="list-product__price">
        <h2>{contact.price}$</h2>
      </div>

      <div className="list-product__icon">
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
