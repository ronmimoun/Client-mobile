import { IconDefaultProps, IconProps } from "./icon-types";

export const ContactIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5971 0.650452C14.2234 0.650452 15.7831 1.28686 16.9331 2.41967C18.0831 3.55249 18.7292 5.08891 18.7292 6.69095C18.7292 8.29299 18.0831 9.82942 16.9331 10.9622C15.7831 12.095 14.2234 12.7315 12.5971 12.7315C10.9707 12.7315 9.41102 12.095 8.26103 10.9622C7.11104 9.82942 6.46498 8.29299 6.46498 6.69095C6.46498 5.08891 7.11104 3.55249 8.26103 2.41967C9.41102 1.28686 10.9707 0.650452 12.5971 0.650452ZM12.5971 15.7517C19.373 15.7517 24.8613 18.4548 24.8613 21.7922V24.8125H0.332886V21.7922C0.332886 18.4548 5.82111 15.7517 12.5971 15.7517Z"
        fill="currentColor"
      />
    </svg>
  );
};

ContactIcon.defaultProps = IconDefaultProps;
