import { Link, useNavigate } from "react-router-dom";
import { DUMMY_USER_URL } from "../../../../constants/image.constants";
import { ROUTES } from "../../../../constants/routes.constants";
import { ContactModel } from "../../../../types/contact/contact.type";

type ContactInfoProps = {
  contact: ContactModel;
  url?: string;
};

const ContactInfo = ({ contact, url }: ContactInfoProps) => {
  const nav = useNavigate();
  const navigateUrl = url
    ? url + ROUTES.BASE + contact._id
    : `${ROUTES.CONTACT_DETAILS_PAGE.FULL_ROUTE_NAME}${contact._id}`;
  return (
    <>
      <div className="list-product__image">
        <Link to={navigateUrl}>
          <img
            src={contact?.img?.url || DUMMY_USER_URL}
            className="img-fluid img__circle"
            alt=""
          />
        </Link>
      </div>

      <div className="list-product__content" onClick={() => nav(navigateUrl)}>
        <h3 className="title">{contact.category}</h3>
        <span className="category">{contact.company}</span>
        <span className="category">{contact.jobTitle}</span>
      </div>
    </>
  );
};

export default ContactInfo;
