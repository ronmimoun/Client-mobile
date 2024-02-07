type NotificationModel = {
  unread: boolean;
  _id: string;
  notificationContent: string;
  notificationTime: string;
};

export const notifications: NotificationModel[] = [
  {
    unread: true,
    _id: "1",
    notificationContent: "Test",
    notificationTime: "15/08/2023",
  },
];
