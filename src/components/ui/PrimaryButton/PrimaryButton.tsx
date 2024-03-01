import { ButtonBase, ButtonBaseProps } from "../buttons/ButtonBase/ButtonBase";

type PrimaryButtonProps = {} & ButtonBaseProps;

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) => {
  return (
    <ButtonBase {...props} className={`primary_button ${className}`}>
      {children}
    </ButtonBase>
  );
};
