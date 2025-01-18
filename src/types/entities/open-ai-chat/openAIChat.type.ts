import { MessageTypeEnum } from "../../../pages/AIChat/ChatMessage/ChatMessage";

export type OpenAISendMessageResponse = {} & OpenAIMessageModel;

export type OpenAIMessageModel = {
  role: MessageTypeEnum;
  content: string;
};
