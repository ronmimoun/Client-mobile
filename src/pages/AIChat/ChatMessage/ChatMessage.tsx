import classes from "./ChatMessage.module.scss";
import { Image } from "../../../components/ui/Image/Image";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { OpenAIMessageModel } from "../../../types/entities/open-ai-chat/openAIChat.type";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";

export enum MessageTypeEnum {
  USER = "user",
  ASSISTANT = "assistant",
}

type ChatMessageProps = {
  message: OpenAIMessageModel;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const currentUser = useSelector(userSelectors.currentUser());

  const getMassagerText = useCallback(() => {
    switch (message.role) {
      case MessageTypeEnum.ASSISTANT:
        return "Chat";
      default:
        return currentUser?.username;
    }
  }, [message, currentUser]);

  return (
    <div className={classes.message}>
      <div
        className={`${classes.message__header} ${
          MessageTypeEnum.ASSISTANT === message.role ? classes.gpt_message : ""
        }`}
      >
        <Image
          className={classes.message__header__image}
          src={currentUser?.imgUrl?.url || DUMMY_USER_URL}
          alt="user"
          aria-label="user"
        />
        {getMassagerText()}
      </div>
      <div className={classes.message__content}>{message.content}</div>
    </div>
  );
};
