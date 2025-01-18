import Contact from "../../components/feature/Contacts/Contact/Contact";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { userSelectors } from "../../store/user/user.selectors";
import { contactApiService } from "../../services/http/api/contact.api.service";
import { ShareIcon } from "../../components/ui/Icons";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import { ContactModel } from "../../types/entities/contact/contact.type";

export const Income = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const [contactSales, setContactSales] = useState<ContactModel[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    getUserContactSale();
  }, []);

  const getUserContactSale = async () => {
    if (!currentUser) return;

    const saleResponse = await contactApiService.getUserSoldContacts({
      userId: currentUser._id,
    });

    if (!saleResponse.isSucceeded || !saleResponse.data?.content) return;

    setContactSales(saleResponse.data.content);
  };

  const onIconClick = useCallback(() => {
    nav(ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME);
  }, []);

  return (
    <PageLayout
      breadCrumbProps={{
        pageTitle: "Income",
        Icon: ShareIcon as IconType,
        onIconClick,
      }}
    >
      {contactSales.map((contact) => (
        <Contact key={contact._id} contact={contact} />
      ))}
    </PageLayout>
  );
};
