import STYLES from "../../../constants/style.constants";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { IconBaseType, IconProps } from "../../ui/Icons/icon-types";

type NoInfoPlaceholderProps = {
  title: string;
  subTitle?: string;
  iconProps?: IconProps;
} & Partial<IconBaseType>;

export const NoInfoPlaceholder = ({
  icon,
  iconProps = { size: 10 },
  title,
  subTitle,
}: NoInfoPlaceholderProps) => {
  return (
    <PageLayout className={STYLES.BACKGROUND_COLOR.WHITE}>
      <div className="no_info_placeholder_container">
        <p className="title">{title}</p>
        {subTitle && <p className="sub_title"></p>}
        {icon && icon(iconProps)}
      </div>
    </PageLayout>
  );
};
