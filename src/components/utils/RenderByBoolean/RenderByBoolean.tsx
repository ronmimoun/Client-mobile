import { PropsWithChildren } from "react";

type RenderByBooleanProps = {
  shouldRender: boolean;
} & PropsWithChildren;

export const RenderByBoolean = ({
  shouldRender,
  children,
}: RenderByBooleanProps) => {
  if (!shouldRender) return <></>;
  return <>{children}</>;
};
