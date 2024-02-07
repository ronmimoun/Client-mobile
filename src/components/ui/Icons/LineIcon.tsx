import { IconDefaultProps, IconProps } from "./icon-types";

export const LineIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      className={className}
      width={size * 3}
      height={size / 2}
      viewBox="0 0 76 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.0524902"
        y="0.803223"
        width="75.895"
        height="5.698"
        rx="2.849"
        fill="#D6D8D9"
      />
    </svg>
  );
};

LineIcon.defaultProps = IconDefaultProps;
