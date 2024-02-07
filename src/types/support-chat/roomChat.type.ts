export type RoomChatModel = {
  _id: string;
  chatId: string;
  fullname: string;
  chatImg: null;
  username: string;
  messages: MessageModel[];
};

export type MessageModel = {
  senderId: string;
  senderName: string;
  receiverId: null;
  content: string;
  createdAt: Date;
  isRead: boolean;
  isUserSender: boolean;
  _id: string;
};
