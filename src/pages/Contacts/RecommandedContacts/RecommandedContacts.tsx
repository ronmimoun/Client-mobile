import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { CategoriesEnum } from "../../../enums/Categories/CategoriesEnum";
import { SelectedFilters } from "../../../types/contact/filters.type";
import { userSelectors } from "../../../store/user/user.selectors";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import ContactList from "../../../components/feature/Contacts/ContactList/ContactList";
import PageLayout from "../../../layout/PageLayout";

type SearchType = {
  cat: string | CategoriesEnum;
  filters: SelectedFilters;
};

export const RecommandedContacts = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const [search, setSearch] = useState<SearchType | null>(null);

  useEffect(() => {
    loadUserSearchHistory();
  }, []);

  const loadUserSearchHistory = () => {
    if (currentUser?.searchHistory?.length) {
      setSearch({
        cat: currentUser.searchHistory[0].category,
        filters: {
          jobTitle: currentUser.searchHistory[0].jobTitle,
          inStock: true,
        },
      });
    } else {
      setSearch({
        cat: CategoriesEnum.Banking,
        filters: {
          jobTitle: "CISO",
          inStock: true,
        },
      });
    }
  };

  return (
    <PageLayout title={PAGES_TITLE.CONTACTS_RECOMMANDED_PAGE.TITLE_NAME}>
      <div className="order-product-area">
        {search ? (
          <ContactList cat={search.cat} filters={search.filters} />
        ) : (
          <div className="no-items-found">
            <div className="no-items-found__image">
              <AiOutlineStar />
            </div>
            <div className="no-items-found__content">
              <p>No Items in the Search History.</p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
