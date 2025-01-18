import { timeUtilService } from "../../../utils/date.utils";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { SupportChatModel } from "../../../types/entities/support-chat/roomChat.type";

type SupportChatMessagesProps = {
  supportChat: SupportChatModel | null;
};

export const SupportChatMessages = ({
  supportChat,
}: SupportChatMessagesProps) => {
  return (
    <div className="chat-wrap">
      {supportChat && (
        <ul className="chat-list">
          {supportChat.messages.map((message, idx) => {
            return (
              <li key={idx}>
                <div
                  className={`chat${
                    message.isUserSender ? "" : " other-message"
                  }`}
                >
                  <div className="body">
                    <div className="image">
                      <img src={DUMMY_USER_URL} alt="" />
                    </div>
                    <div className="content">
                      <div className="head">
                        <h5>{message.isUserSender ? "Me" : "Admin"}</h5>
                        <span>
                          {timeUtilService.formatTimestamp(
                            new Date(message.createdAt)
                          )}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
