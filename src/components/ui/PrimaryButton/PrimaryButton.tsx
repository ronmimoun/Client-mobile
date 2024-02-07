import { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <button {...props} className="primary_button">
      {children}
    </button>
  );
};
