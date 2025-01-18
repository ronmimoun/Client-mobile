import {
  ContactModel,
  PresentativeContactType,
} from "../types/entities/contact/contact.type";

export const createPresentativeContact = (
  contact: ContactModel
): PresentativeContactType => {
  return {
    _id: contact._id,
    category: contact.category,
    company: contact.company,
    img: contact.img,
    jobTitle: contact.jobTitle,
    price: contact.price,
  };
};
