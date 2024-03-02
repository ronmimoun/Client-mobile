import { ButtonBase, ButtonBaseProps } from "../ButtonBase/ButtonBase";

type ButtonIconBaseProps = {} & ButtonBaseProps;

export const ButtonIconBase = ({
  className,
  ...props
}: ButtonIconBaseProps) => {
  return (
    <ButtonBase {...props} className={className}>
      {props.children}
    </ButtonBase>
  );
};
