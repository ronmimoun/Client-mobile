import { IconDefaultProps, IconProps } from "./icon-types";

export const ExitIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0px"
    >
      <path
        d="M1.88086 1.6958L11.8809 11.6958M1.88086 11.6958L11.8809 1.6958"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ExitIcon.defaultProps = IconDefaultProps;
