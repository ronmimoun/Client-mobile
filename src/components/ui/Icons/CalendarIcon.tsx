import { IconDefaultProps, IconProps } from "./icon-types";

export const CalendarIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2419 2.86328H2.7734C1.78966 2.86328 0.992188 3.66076 0.992188 4.6445V17.113C0.992188 18.0967 1.78966 18.8942 2.7734 18.8942H15.2419C16.2256 18.8942 17.0231 18.0967 17.0231 17.113V4.6445C17.0231 3.66076 16.2256 2.86328 15.2419 2.86328Z"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5701 1.08105V4.64348M5.44522 1.08105V4.64348M0.992188 8.20591H17.0231"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CalendarIcon.defaultProps = IconDefaultProps;
