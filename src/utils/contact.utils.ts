import {
  ContactModel,
  PresentativeContact,
} from "../types/contact/contact.type";

export const createPresentativeContact = (
  contact: ContactModel
): PresentativeContact => {
  return {
    _id: contact._id,
    category: contact.category,
    company: contact.company,
    img: contact.img,
    jobTitle: contact.jobTitle,
    price: contact.price,
  };
};
