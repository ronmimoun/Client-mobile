import React from "react";
import STYLES from "../../constants/style.constants";
import Breadcrumb, { BreadcrumbProps } from "../../components/ui/Breadcrumb";

type PageLayoutProps = {
  children: React.ReactNode;
  title?: string;
  breadCrumbProps?: BreadcrumbProps;
  className?: string;
};

export const PageLayout = ({
  children,
  title = "",
  breadCrumbProps,
  className = "",
}: PageLayoutProps) => {
  return (
    <div
      className={`body-wrapper space-pb--120 ${STYLES.BACKGROUND_COLOR.WHITE_TOP} ${className}`}
    >
      <Breadcrumb
        {...breadCrumbProps}
        pageTitle={title || breadCrumbProps?.pageTitle}
      />

      <div className="container space-x--20">{children}</div>
    </div>
  );
};
export default PageLayout;
