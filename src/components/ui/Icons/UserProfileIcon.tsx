import { IconDefaultProps, IconProps } from "./icon-types";

export const UserProfileIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0"
    >
      <path
        d="M7.39359 0.983032C8.37247 0.983032 9.31126 1.37318 10.0034 2.06763C10.6956 2.76209 11.0845 3.70398 11.0845 4.6861C11.0845 5.66821 10.6956 6.6101 10.0034 7.30456C9.31126 7.99902 8.37247 8.38916 7.39359 8.38916C6.41471 8.38916 5.47592 7.99902 4.78375 7.30456C4.09157 6.6101 3.70271 5.66821 3.70271 4.6861C3.70271 3.70398 4.09157 2.76209 4.78375 2.06763C5.47592 1.37318 6.41471 0.983032 7.39359 0.983032ZM7.39359 10.2407C11.472 10.2407 14.7753 11.8978 14.7753 13.9438V15.7953H0.0118408V13.9438C0.0118408 11.8978 3.31517 10.2407 7.39359 10.2407Z"
        fill="currentColor"
      />
    </svg>
  );
};

UserProfileIcon.defaultProps = IconDefaultProps;
