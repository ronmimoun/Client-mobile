import { useContactSettings } from "../../../../hooks/useContactSettings";
import { InStockAndOwnerContactButton } from "./InStockAndOwnerContactButton/InStockAndOwnerContactButton";
import { NotOwnedInFavoritesContactButton } from "./NotOwnedInFavoritesContactButton/NotOwnedInFavoritesContactButton";
import { NotOwnerAndNotFavoriteContactButton } from "./NotOwnedAndNotFavoriteContactButton/NotOwnerAndNotFavoriteContactButton";
import { OwnedAndNotInStockContactButton } from "./OwnedAndNotInStockContactButton/OwnedAndNotInStockContactButton";
import { ContactModel } from "../../../../types/contact/contact.type";

type ScenariosPurchaseButtonProps = {
  contact: ContactModel;
};

export const ScenariosPurchaseButton = ({
  contact,
}: ScenariosPurchaseButtonProps) => {
  const { isFavorite, isOwned, onAddFavorite, onRemoveFavorite } =
    useContactSettings({ contact });

  if (contact.inStock && isOwned) {
    return <InStockAndOwnerContactButton contact={contact} />;
  } else if (!isOwned && isFavorite) {
    return (
      <NotOwnedInFavoritesContactButton
        contact={contact}
        secondaryButtonCb={onRemoveFavorite}
      />
    );
  } else if (!isOwned && !isFavorite) {
    return (
      <NotOwnerAndNotFavoriteContactButton
        contact={contact}
        secondaryButtonCb={onAddFavorite}
      />
    );
  } else if (isOwned && !contact.inStock) {
    return <OwnedAndNotInStockContactButton contact={contact} />;
  } else return null;
};
