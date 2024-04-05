import classes from "./ContactDetails.module.scss";
import PageLayout from "../../../layout/PageLayout";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FIXED_PRICE } from "../../../constants/values.constants";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { AiOutlineLike } from "react-icons/ai";
import { ContactModel } from "../../../types/contact/contact.type";
import { contactApiService } from "../../../services/http/api/contact.api.service";
import { BreadcrumbProps } from "../../../components/ui/Breadcrumb";
import { MdOutlineSecurity } from "react-icons/md";
import { ScenariosPurchaseButton } from "./ScenariosPurchaseButton/ScenariosPurchaseButton";
import { ContactTransactionType } from "../../../enums/Contact/ContactTransactionType";
import { ROUTES } from "../../../constants/routes.constants";
import { feedbackApiService } from "../../../services/http/api/feedback.api.service";
import { NoInfoPlaceholder } from "../../../components/feature/NoInfoPlaceholder/NoInfoPlaceholder";
import { ContactNotFoundIcon } from "../../../components/ui/Icons";
import { UserModel } from "../../../types/user.type";
import { ContactDetailsInfo } from "./ContactDetailsInfo/ContactDetailsInfo";
import { combineClassNames } from "../../../utils/formatters.utils";

export const ContactDetails = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;

  const [contact, setContact] = useState<ContactModel | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [isGotFeedback, setIsGotFeedback] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    loadContact(id);
  }, []);

  useEffect(() => {
    checkIsOwnedByUser();
  }, [currentUser]);

  useEffect(() => {
    if (isOwned) checkIsContactGotFeedback();
  }, [isOwned]);

  const checkIsContactGotFeedback = async () => {
    if (!id) return;

    const feedback = await feedbackApiService.query({
      userId: currentUser._id,
      contactId: id,
    });

    if (!feedback.isSucceeded || !feedback.data?.content) return;

    if (feedback.data.content.length) setIsGotFeedback(true);
    else setIsGotFeedback(false);
  };

  const checkIsOwnedByUser = () => {
    if (currentUser) {
      const isOwned = currentUser.contactTransactions.find(
        (trans) =>
          trans.type === ContactTransactionType.ContactPurchase &&
          trans.contact._id === id
      )
        ? true
        : false;
      setIsOwned(isOwned);
    } else setIsOwned(false);
  };

  const loadContact = async (id: string) => {
    const contactResponse = await contactApiService.getById(id);
    if (!contactResponse.isSucceeded || !contactResponse.data?.content) return;

    loadFavorite(contactResponse.data.content);
    setContact(contactResponse.data.content);
  };

  const loadFavorite = (contact: ContactModel) => {
    if (currentUser) {
      const isFavorite = currentUser.favorites.find(
        (favorite) => favorite._id === contact._id
      );
      if (isFavorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  const breadCrumbProps = useMemo((): BreadcrumbProps => {
    return {
      pageTitle: PAGES_TITLE.CONTACT_DETAILS_PAGE.TITLE_NAME,
      Icon: isOwned ? AiOutlineLike : undefined,
      iconClassName: `icon${isGotFeedback ? " active" : ""} icon-size-30`,
      onIconClick: () =>
        isOwned ? navigate(ROUTES.FEEDBACK_PAGE.FULL_ROUTE_NAME + id) : {},
    };
  }, [isOwned]);

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
        <h3 className="product-image__contact-name">
          {contact.name} {contact.familyName}
        </h3>
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
        setIsFavorite={setIsFavorite}
      />
    </PageLayout>
  );
};

export default ContactDetails;
