import { useEffect, useState } from "react";
import { ContactModel } from "../../types/contact/contact.type";
import { contactApiService } from "../../services/http/api/contact.api.service";
import Contact from "../../components/feature/Contacts/Contact/Contact";
import { ROUTES } from "../../constants/routes.constants";
import PageLayout from "../../layout/PageLayout/PageLayout";

const WeAreLookingForList = () => {
  const [contactsNotInStock, setContactsNotInStock] = useState<ContactModel[]>(
    []
  );

  useEffect(() => {
    const loadContacts = async () => {
      const response = await contactApiService.getNotRequestedContacts();
      if (!response.isSucceeded || !response.data?.content) return;

      setContactsNotInStock(response.data.content);
    };

    loadContacts();
  }, []);

  return (
    <PageLayout title="We are looking for">
      {contactsNotInStock.map((contact) => {
        return (
          <Contact
            key={contact._id}
            contact={contact}
            clickContactLink={
              ROUTES.BASE + ROUTES.WE_ARE_LOOKING_FOR_PAGE.ROUTE_NAME
            }
          />
        );
      })}
    </PageLayout>
  );
};

export default WeAreLookingForList;
