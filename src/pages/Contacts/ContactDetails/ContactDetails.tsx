import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FIXED_PRICE } from "../../../constants/values.constants";
import { textUtilService } from "../../../utils/text.utils";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { AiOutlineLike } from "react-icons/ai";
import { ContactModel } from "../../../types/contact/contact.type";
import { contactApiService } from "../../../services/http/api/contact.api.service";
import { BreadcrumbProps } from "../../../components/ui/Breadcrumb";
import { MdOutlineSecurity } from "react-icons/md";
import { ScenariosPurchaseButton } from "./ScenariosPurchaseButton";
import { ContactTransactionType } from "../../../enums/Contact/ContactTransactionType";
import { ROUTES } from "../../../constants/routes.constants";
import { feedbackApiService } from "../../../services/http/api/feedback.api.service";
import { Mailto } from "../../../components/ui/MailTo/MailTo";
import { NoInfoPlaceholder } from "../../../components/feature/NoInfoPlaceholder/NoInfoPlaceholder";
import PageLayout from "../../../layout/PageLayout";
import { ContactNotFoundIcon } from "../../../components/ui/Icons";
import { UserModel } from "../../../types/user.type";

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
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product-content-header">
                <div className="product-content-header__main-info">
                  {isOwned && (
                    <div className="flex gap--15">
                      <h3 className="title">Country:</h3>
                      {contact.country && (
                        <p className="info">
                          {textUtilService.getFirstLetterUppercase(
                            contact.country
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {isOwned && (
                    <div className="flex gap--15">
                      <h3 className="title">Category:</h3>
                      <p className="info">{contact.category}</p>
                    </div>
                  )}

                  {isOwned && (
                    <div className="flex gap--15">
                      <h3 className="title">Company:</h3>
                      <p className="info">{contact.company}</p>
                    </div>
                  )}

                  {isOwned && (
                    <div className="flex gap--15">
                      <h3 className="title">Job Title:</h3>
                      <p className="info">{contact.jobTitle}</p>
                    </div>
                  )}

                  {contact.emails.length > 0 && (
                    <div className="flex gap--15">
                      <h3 className="title">Mail:</h3>
                      <Mailto email={contact.emails[0]?.emailUrl}>
                        {contact.emails[0]?.emailUrl}
                      </Mailto>
                    </div>
                  )}

                  <div className="flex gap--15">
                    <h3 className="title">Mobile:</h3>
                    <p className="info">{contact.mobile}</p>
                  </div>

                  {contact.linkedinLink && isOwned && (
                    <div className="fold_text">
                      <h3 className="title">Linkedin:</h3>
                      <p className="info">{contact.linkedinLink}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="product-price">
                <span>{`$${contact.price.toFixed(FIXED_PRICE)}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* product content description */}
      <div className="product-content-description border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="space-mb--10">Info:</h4>
              <p>{contact.desc}</p>
            </div>
          </div>
        </div>
      </div>
      {/* product content safety */}
      <div className="product-content-safety">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>
                <MdOutlineSecurity /> Secure Payment Method.
              </h4>
            </div>
          </div>
        </div>
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
