import { IconDefaultProps, IconProps } from "./icon-types";

export const BellIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7115 21.1526V22.0841C15.7115 23.0723 15.3189 24.02 14.6202 24.7187C13.9214 25.4175 12.9737 25.81 11.9855 25.81C10.9973 25.81 10.0496 25.4175 9.35084 24.7187C8.65209 24.02 8.25953 23.0723 8.25953 22.0841V21.1526M21.9804 19.2564C20.4854 17.4266 19.4299 16.4951 19.4299 11.4505C19.4299 6.83089 17.0709 5.18506 15.1293 4.38572C14.8714 4.27977 14.6286 4.03641 14.55 3.77152C14.2094 2.6124 13.2547 1.59125 11.9855 1.59125C10.7163 1.59125 9.76098 2.61298 9.4239 3.77268C9.3453 4.04049 9.10253 4.27977 8.84463 4.38572C6.90072 5.18622 4.54404 6.82623 4.54404 11.4505C4.54113 16.4951 3.48564 17.4266 1.99059 19.2564C1.37115 20.0144 1.91374 21.1526 2.99719 21.1526H20.9796C22.0573 21.1526 22.5964 20.0109 21.9804 19.2564Z"
        stroke="#D6D8D9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

BellIcon.defaultProps = IconDefaultProps;
