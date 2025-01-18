import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { contactApiService } from "../../../../services/http/api/contact.api.service";
import { ROUTES } from "../../../../constants/routes.constants";
import Contact from "../Contact/Contact";
import { SelectedFilters } from "../../../../types/entities/contact/filters.type";
import { ContactModel } from "../../../../types/entities/contact/contact.type";

type ContactListProps = {
  cat?: string;
  filters?: SelectedFilters | null;
  sort?: string;
  title?: string;
  count?: number;
};

export default function ContactList({
  cat,
  filters,
  sort,
  title,
  count = Infinity,
}: ContactListProps) {
  const [contacts, setContacts] = useState<Array<ContactModel>>([]);
  const [filteredContacts, setFilteredContacts] = useState<Array<ContactModel>>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!contacts.length) loadContacts();
  }, []);

  useEffect(() => {
    if (filters?.recentAdded) {
      setFilteredContacts(filterNewContacts(contacts, filters.recentAdded));
    }

    cat &&
      filters &&
      setFilteredContacts(
        contacts.filter((contact) => {
          return Object.entries(filters).every(([key, value]) => {
            if ((contact as any)[key]) return (contact as any)[key] === value;
          });
        })
      );
  }, [contacts, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredContacts(() =>
        [...contacts].sort((a, b) => {
          if (!a.createdAt && !b.createdAt) {
            return 0;
          }
          if (!a.createdAt) {
            return 1;
          }
          if (!b.createdAt) {
            return -1;
          }
          const result = +new Date(b.createdAt) - +new Date(a.createdAt);
          return result;
        })
      );
    } else if (sort === "asc") {
      setFilteredContacts(() =>
        [...contacts].sort((a, b) =>
          a.name?.toLowerCase().localeCompare(b.name?.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(() =>
        [...contacts].sort((a, b) =>
          b.name?.toLowerCase().localeCompare(a.name?.toLowerCase())
        )
      );
    }
  }, [contacts, sort]);

  const loadContacts = async () => {
    try {
      let data: ContactModel[] = [];
      if (cat) {
        const contactResponse = await contactApiService.queryByCategory(cat);
        if (!contactResponse.isSucceeded || !contactResponse.data?.content)
          return;
        data = contactResponse.data.content;
      } else {
        const contactResponse = await contactApiService.controlledQuery();
        if (!contactResponse.isSucceeded || !contactResponse.data)
          return (data = []);
        data = contactResponse.data.content;
      }
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  function filterNewContacts(contacts: Array<ContactModel>, months = 1) {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - months);
    return contacts.filter((contact) => {
      const createdAtDate = new Date(contact.createdAt);
      return createdAtDate >= oneMonthAgo && createdAtDate <= currentDate;
    });
  }

  return (
    <div className="contact-list--container">
      {(title || filters) && (
        <div className="contact-list__header">
          {title && <h5 className="title">{title}</h5>}
          {filters &&
            Object.prototype.hasOwnProperty.call(filters, "recentAdded") &&
            filters.recentAdded! > 0 && (
              <span
                onClick={() =>
                  navigate(ROUTES.ALL_CONTACTS_PAGE.FULL_ROUTE_NAME)
                }
              >
                view all
              </span>
            )}
        </div>
      )}

      <div className="contact-list--wrapper">
        {filteredContacts.length > 0 &&
          filteredContacts.slice(0, count).map((contact) => {
            return <Contact key={contact._id} contact={contact} />;
          })}
      </div>
    </div>
  );
}
