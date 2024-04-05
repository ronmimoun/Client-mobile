import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { ArrowIcon } from "./Icons";
import { RenderByBooleanWrapper } from "../utils/RenderByBooleanWrapper/RenderByBooleanWrapper";
import { ButtonIconBase } from "./buttons/ButtonIconBase/ButtonIconBase";
import { combineClassNames } from "../../utils/formatters.utils";

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
      <div className="breadcrumb-area__wrapper">
        <ButtonIconBase className="icon" onClick={() => navigate(-1)}>
          <ArrowIcon />
        </ButtonIconBase>

        <RenderByBooleanWrapper shouldRender={!!pageTitle}>
          <h1 className="page-title">{pageTitle}</h1>
        </RenderByBooleanWrapper>

        <ButtonIconBase
          className={combineClassNames([
            "icon",
            !Icon && "icon_placeholder",
            iconClassName,
          ])}
          onClick={onIconClick}
        >
          {Icon && <Icon />}
        </ButtonIconBase>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  pageTitle: PropTypes.string,
  prevUrl: PropTypes.string,
};

export default Breadcrumb;
