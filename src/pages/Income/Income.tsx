import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { userSelectors } from "../../store/user/user.selectors";
import { contactApiService } from "../../services/http/api/contact.api.service";
import { ContactModel } from "../../types/contact/contact.type";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Contact from "../../components/feature/Contacts/Contact/Contact";

export const Income = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const [contactSales, setContactSales] = useState<ContactModel[]>([]);

  useEffect(() => {
    getUserContactSale();
  }, []);

  const getUserContactSale = async () => {
    if (!currentUser) return;
    const saleResponse = await contactApiService.getUserContactSales(
      currentUser._id
    );
    if (!saleResponse.isSucceeded || !saleResponse.data?.content) return;

    setContactSales(saleResponse.data.content);
  };

  return (
    <div className="body-wrapper space-pb--120 backgrounds__white-top">
      <Breadcrumb pageTitle="Income" />
      {contactSales.map((contact) => (
        <Contact key={contact._id} contact={contact} />
      ))}
    </div>
  );
};
