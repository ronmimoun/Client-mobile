import { PropsWithChildren } from "react";

type RenderByBooleanWrapperProps = {
  shouldRender: boolean;
} & PropsWithChildren;

export const RenderByBooleanWrapper = ({
  shouldRender,
  children,
}: RenderByBooleanWrapperProps) => {
  if (!shouldRender) return <></>;
  return <>{children}</>;
};
