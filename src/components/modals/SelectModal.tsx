import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { SelectedFilters } from "../../types/contact/filters.type";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { elementUtilService } from "../../utils/element.utils";
import { ArrowIcon, LineIcon, SortIcon } from "../ui/Icons";

type SelectModalProps = {
  setSelectedFilters: (type: FilterModeEnum, value: string) => void;
  selectedFilters?: SelectedFilters;
  cat: string;
};

type IsFilterOpen = {
  type: FilterModeEnum;
  accessor: FilterModeEnum;
};

export enum FilterModeEnum {
  COMPANY = "company",
  TITLE = "jobTitle",
}

const SelectModal = ({
  setSelectedFilters,
  selectedFilters,
  cat,
}: SelectModalProps) => {
  const { companies, jobTitles } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const [isFilterOpen, setIsFilterOpen] = useState<IsFilterOpen | null>(null);

  useEffect(() => {
    if (!isFilterOpen) {
      elementUtilService.ignoreBodyScroll();
    }
  }, [isFilterOpen]);
  const onOpenFilter = (type: FilterModeEnum) => {
    setIsFilterOpen({
      type: type,
      accessor:
        type === FilterModeEnum.COMPANY
          ? FilterModeEnum.COMPANY
          : FilterModeEnum.TITLE,
    });
    elementUtilService.ignoreBodyScroll(true);
  };

  const handleSelect = (type: FilterModeEnum, value: string) => {
    setSelectedFilters(type, value);
  };

  const getSelectedList = () => {
    if (isFilterOpen) {
      if (isFilterOpen?.type === FilterModeEnum.COMPANY)
        return companies.filter((company) => company.category === cat);
      else return jobTitles;
    } else return [];
  };

  const isRadioChecked = (value: number) => {
    if (!selectedFilters) return;
    return !!Object.values(selectedFilters).find((filter) => filter === value);
  };

  return (
    <div className="container contact-filter-by">
      <div className="contact-filter-by__item">
        <SortIcon />
        <h4>Sort By</h4>
      </div>

      <div
        className={`contact-filter-by__item${
          isFilterOpen?.type === FilterModeEnum.COMPANY ? " active" : ""
        }`}
        onClick={() => onOpenFilter(FilterModeEnum.COMPANY)}
      >
        <h2>Company</h2>
        <ArrowIcon className="rotate_270" />
      </div>
      <div
        className={`contact-filter-by__item${
          isFilterOpen?.type === FilterModeEnum.TITLE ? " active" : ""
        }`}
        onClick={() => onOpenFilter(FilterModeEnum.TITLE)}
      >
        <h2>Title</h2>
        <ArrowIcon className="rotate_270" />
      </div>

      <div className={`filter-menu__shadow${isFilterOpen ? " active" : ""}`}>
        <div className="filter-menu-container">
          <div className="filter-menu__list">
            {isFilterOpen &&
              getSelectedList().map((entity) => {
                const KEY =
                  isFilterOpen.accessor === FilterModeEnum.TITLE
                    ? "title"
                    : FilterModeEnum.COMPANY;
                return (
                  <div key={entity._id} className="filter-menu__item">
                    <label htmlFor="filter">{(entity as any)[KEY]}</label>
                    <input
                      type="radio"
                      id="filter"
                      checked={isRadioChecked((entity as any)[KEY])}
                      onChange={() =>
                        handleSelect(isFilterOpen?.type, (entity as any)[KEY])
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div
            className="filter-menu__line"
            onClick={() => setIsFilterOpen(null)}
          >
            <LineIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
