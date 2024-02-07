export interface IconProps {
  className?: string;
  size: IconSizeEnum | number;
  onClick?: () => void;
}

export const enum IconSizeEnum {
  XX_SMALL = 10,
  X_SMALL = 15,
  SMALL = 20,
  MEDIUM = 30,
  LARGE = 40,
  X_LARGE = 50,
  XX_LARGE = 60,
}

export const IconDefaultProps: IconProps = {
  size: IconSizeEnum.SMALL,
  className: "icon",
};

export type IconBaseType = {
  icon: ({ size, className }: IconProps) => JSX.Element;
};
