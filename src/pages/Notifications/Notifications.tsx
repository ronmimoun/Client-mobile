import clsx from "clsx";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { notifications } from "./mock";
import PageLayout from "../../layout/PageLayout";

export const Notifications = () => {
  return (
    <PageLayout title={PAGES_TITLE.NOTIFICATIONS_PAGE.TITLE_NAME}>
      <div className="notification-wrapper">
        {notifications.map((single) => (
          <div
            className={clsx(
              "notification-item",
              single.unread && "notification-item--unread"
            )}
            key={single._id}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: single.notificationContent,
              }}
            />
            <div className="notification-item__time">
              {" "}
              <span></span> {single.notificationTime}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};
