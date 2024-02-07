import { useSelector } from "react-redux";

import { AiOutlineBank } from "react-icons/ai";
import { MdOutlinePolicy } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { RiGovernmentFill } from "react-icons/ri";
import { DiTechcrunch } from "react-icons/di";
import { BsTelephoneForward } from "react-icons/bs";
import { SlEnergy } from "react-icons/sl";
import { FaIndustry } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CategoriesEnum } from "../../enums/Categories/CategoriesEnum";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { ROUTES } from "../../constants/routes.constants";

type SearchByCategoryProps = {
  show: boolean;
  handleClose: () => void;
};

export const SearchByCategory = ({
  show,
  handleClose,
}: SearchByCategoryProps) => {
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const navigate = useNavigate();

  const icons = [
    { _id: CategoriesEnum.Banking, Icon: <AiOutlineBank /> },
    { _id: CategoriesEnum.Insurance, Icon: <MdOutlinePolicy /> },
    { _id: CategoriesEnum.Healthcare, Icon: <BiHealth /> },
    { _id: CategoriesEnum.Goverment, Icon: <RiGovernmentFill /> },
    { _id: CategoriesEnum.HighTech, Icon: <DiTechcrunch /> },
    { _id: CategoriesEnum.Telecom, Icon: <BsTelephoneForward /> },
    { _id: CategoriesEnum.Energy, Icon: <SlEnergy /> },
    { _id: CategoriesEnum.Industries, Icon: <FaIndustry /> },
  ];

  const getCategoryIcon = (cat: string) => {
    const res = icons.find((icon) => icon._id === cat);
    if (res) return res.Icon;
    else return null;
  };

  const handleSelection = (url: string) => {
    navigate(url);
    handleClose();
  };

  return (
    <div className={`search-menu ${show ? "active" : ""}`}>
      <ul className="search-menu-navigation">
        {categories.map((category) => {
          return (
            <li
              key={category._id}
              onClick={() =>
                handleSelection(
                  `${ROUTES.CONTACTS_PAGE.FULL_ROUTE_NAME}/${category.cat}`
                )
              }
            >
              <span className="icon">{getCategoryIcon(category.cat)}</span>
              <p>{category.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchByCategory;
