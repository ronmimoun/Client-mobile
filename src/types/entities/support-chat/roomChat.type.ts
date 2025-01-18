export type SupportChatModel = {
  _id: string;
  fullname: string;
  chatImg: null;
  username: string;
  messages: SupportChatMessageModel[];
};

export type SupportChatMessageModel = {
  senderId: string;
  senderName: string;
  receiverId: null;
  content: string;
  createdAt: Date;
  isRead: boolean;
  isUserSender: boolean;
  _id: string;
};
