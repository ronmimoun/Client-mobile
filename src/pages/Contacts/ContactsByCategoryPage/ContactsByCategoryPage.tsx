import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ExitIcon } from "../../../components/ui/Icons";
import { SelectedFilters } from "../../../types/contact/filters.type";
import { FORWARD_SLASH } from "../../../constants/keys.constants";
import { FilterModeEnum } from "../../../types/modals/SelectModal";
import SelectModal from "../../../components/modals/SelectModal";
import { textUtilService } from "../../../utils/text.utils";
import ContactList from "../../../components/feature/Contacts/ContactList/ContactList";

export const ContactsByCategoryPage = () => {
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>();
  const cat = location.pathname.split(FORWARD_SLASH)[2];

  const handleFilterDelete = (type: string | boolean | number) => {
    if (!selectedFilters) return;
    const filters = { ...selectedFilters };
    for (const filter in filters) {
      if ((filters as any)[filter] === type) {
        delete (filters as any)[filter];
      }
    }
    setSelectedFilters(filters);
  };

  const handleFilterSelect = (type: FilterModeEnum, value: string) => {
    setSelectedFilters((prevState: any) => ({ ...prevState, [type]: value }));
  };

  return (
    <div className="body-wrapper space-pb--60 contact-category">
      <div className="breadcrumb-area">
        <SelectModal
          selectedFilters={selectedFilters}
          setSelectedFilters={handleFilterSelect}
          cat={cat}
        />

        {selectedFilters && Object.values(selectedFilters).length > 0 && (
          <div className="container flex justify-space mt-4 mb-4">
            <div className="flex align-center gap-2">
              <ExitIcon />
              <h4>Filters {`(${Object.values(selectedFilters).length})`}</h4>
            </div>

            <div className="flex align-center gap-2 contact-category-filters">
              {Object.values(selectedFilters).map((filter, idx) => (
                <h4 key={idx} className="filter__item">
                  {filter}
                  <span onClick={() => handleFilterDelete(filter)}>
                    <ExitIcon />
                  </span>
                </h4>
              ))}
            </div>
          </div>
        )}
      </div>
      <ContactList
        cat={cat}
        filters={selectedFilters}
        title={textUtilService.getFirstLetterUppercase(cat)}
      />
    </div>
  );
};
