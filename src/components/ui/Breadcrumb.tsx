import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { ArrowIcon } from "./Icons";

export type BreadcrumbProps = {
  pageTitle?: string;
  Icon?: IconType;
  iconClassName?: string;
  onIconClick?: () => void;
};

const Breadcrumb = ({
  pageTitle,
  onIconClick,
  Icon,
  iconClassName,
}: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-area space-pt--25 space-pb--25">
      <div className="container">
        <div className="breadcrumb-area__wrapper">
          <span className="icon" onClick={() => navigate(-1)}>
            <ArrowIcon />
          </span>
          {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
          {Icon && (
            <button className={`${iconClassName}`} onClick={onIconClick}>
              <Icon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageTitle: PropTypes.string,
  prevUrl: PropTypes.string,
};

export default Breadcrumb;
