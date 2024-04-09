import classes from "./ContactDetails.module.scss";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FIXED_PRICE } from "../../../constants/values.constants";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { AiOutlineLike } from "react-icons/ai";
import { BreadcrumbProps } from "../../../components/ui/Breadcrumb";
import { MdOutlineSecurity } from "react-icons/md";
import { ScenariosPurchaseButton } from "./ScenariosPurchaseButton/ScenariosPurchaseButton";
import { ROUTES } from "../../../constants/routes.constants";
import { NoInfoPlaceholder } from "../../../components/feature/NoInfoPlaceholder/NoInfoPlaceholder";
import { ContactNotFoundIcon } from "../../../components/ui/Icons";
import { ContactDetailsInfo } from "./ContactDetailsInfo/ContactDetailsInfo";
import { combineClassNames } from "../../../utils/formatters.utils";
import { ContactDetailsAICompanyInfo } from "./ContactDetailsAICompanyInfo/ContactDetailsAICompanyInfo";
import { useInitialContactDetails } from "../../../hooks/useInitialContactDetails";

export const ContactDetails = () => {
  const navigate = useNavigate();
  const { contact, isFavorite, isGotFeedback, isOwned, addContactAsFavorite } =
    useInitialContactDetails();

  const breadCrumbProps = useMemo((): BreadcrumbProps => {
    return {
      pageTitle: PAGES_TITLE.CONTACT_DETAILS_PAGE.TITLE_NAME,
      Icon: isOwned ? AiOutlineLike : undefined,
      iconClassName: `icon${isGotFeedback ? " active" : ""} icon-size-30`,
      onIconClick: () =>
        isOwned
          ? navigate(ROUTES.FEEDBACK_PAGE.FULL_ROUTE_NAME + contact?._id)
          : {},
    };
  }, [isOwned, contact]);

  if (!contact)
    return (
      <NoInfoPlaceholder title="No Contact Found" icon={ContactNotFoundIcon} />
    );

  return (
    <PageLayout breadCrumbProps={breadCrumbProps}>
      {/*====================  contact image ====================*/}
      <div className="product-image-slider-wrapper">
        <div className="product-image-single swiper-slide">
          <img
            src={contact?.img?.url || DUMMY_USER_URL}
            className="img-fluid img__circle"
            alt=""
          />
        </div>
      </div>

      {/*====================  contact content ====================*/}
      <div className="product-content-header-area border-bottom space-pb--15">
        <ContactDetailsInfo isOwned={isOwned} contact={contact} />
        <div className="product-price">
          <span>{`$${contact.price.toFixed(FIXED_PRICE)}`}</span>
        </div>
      </div>

      {/* product content description */}
      <div
        className={combineClassNames([classes.description, "border-bottom"])}
      >
        <h4>Info:</h4>
        <p>{contact.desc || "Currently no additional info to display"}</p>
      </div>

      {/* product content safety */}
      <div className={classes.content_safety}>
        <p className={classes.content_safety__text}>
          <MdOutlineSecurity /> Secure Payment Method.
        </p>
      </div>

      {/* shop product button */}
      <ScenariosPurchaseButton
        contact={contact}
        isOwned={isOwned}
        isFavorite={isFavorite}
        setIsFavorite={addContactAsFavorite}
      />

      <ContactDetailsAICompanyInfo contact={contact} />
    </PageLayout>
  );
};

export default ContactDetails;
