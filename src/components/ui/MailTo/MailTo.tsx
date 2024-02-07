import { ReactNode } from "react";

type MailToProps = {
  email: string;
  subject?: string;
  body?: string;
  children: ReactNode;
};

export const Mailto = ({
  email,
  subject = "Qleads",
  body = "",
  children,
}: MailToProps) => {
  return (
    <a
      className="mail_to"
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
    >
      {children}
    </a>
  );
};
