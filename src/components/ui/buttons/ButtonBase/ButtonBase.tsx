import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonBaseProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBase = ({
  children,
  className = "",
  ...props
}: ButtonBaseProps) => {
  return (
    <button {...props} className={`button_base ${className}`}>
      {children}
    </button>
  );
};
