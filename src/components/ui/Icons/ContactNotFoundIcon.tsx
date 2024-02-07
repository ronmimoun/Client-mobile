import { IconProps, IconSizeEnum } from "./icon-types";
import { TbFaceIdError } from "react-icons/tb";

export const ContactNotFoundIcon = ({
  size = IconSizeEnum.SMALL,
  className,
}: IconProps) => {
  const styles = {
    height: `${size}rem`,
    width: `${size}rem`,
  };

  return <TbFaceIdError style={styles} className={className} />;
};
