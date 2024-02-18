import { FaRegPaperPlane } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { userSelectors } from "../../store/user/user.selectors";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useUpdateEffect } from "../../hooks/useEffectUpdate";
import { supportChatApiService } from "../../services/http/api/supportChat.api.service";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { RoomChatModel } from "../../types/support-chat/roomChat.type";
import { timeUtilService } from "../../utils/date.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../constants/popup.constants";
import { DUMMY_USER_URL } from "../../constants/image.constants";
import {
  SUPPORT_CHAT_FORM_CONFIG,
  SUPPORT_CHAT_FORM_SCHEMA,
  SupportChatForm,
} from "../../form/schemas/SupportChatSchema";
import PageLayout from "../../layout/PageLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../components/ui/Preloader/Loader";
import { UserModel } from "../../types/user.type";

export const SupportChat = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [room, setRoom] = useState<RoomChatModel | null>(null);
  const formMethods = useForm<SupportChatForm>({
    defaultValues: {
      [SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY]:
        SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.DEFAULT_VALUE,
    },
    resolver: zodResolver(SUPPORT_CHAT_FORM_SCHEMA),
  });
  const scrollDown = useScrollToBottom();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    formMethods.setFocus(SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY);
    loadSupportChat();
  }, []);

  useUpdateEffect(() => {
    scrollDown();
    formMethods.setFocus(SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY);
  }, [room]);

  const loadSupportChat = useCallback(async () => {
    const currentUserChatSupport = await supportChatApiService.getById(
      currentUser._id
    );

    if (
      !currentUserChatSupport.isSucceeded ||
      !currentUserChatSupport.data?.content
    )
      return toast.error(POPUP_MESSAGE.SUPPORT_CHAT.AN_PROBLEM_OCCURRED);

    setRoom(currentUserChatSupport.data.content);
  }, []);

  const onSubmit = useCallback(
    async ({ message }: SupportChatForm) => {
      if (!room) return;
      setIsLoading(true);

      const request = {
        userId: currentUser._id,
        message,
        isUserSender: true,
      };

      const messageResponse = await supportChatApiService.create(request);
      setIsLoading(false);

      if (!messageResponse.isSucceeded || !messageResponse.data?.content)
        return toast.error(POPUP_MESSAGE.SUPPORT_CHAT.AN_PROBLEM_OCCURRED);

      setRoom({
        ...room,
        messages: [...room.messages, messageResponse.data.content],
      });
      formMethods.reset();
    },
    [room]
  );

  return (
    <PageLayout title={PAGES_TITLE.SUPPORT_CHAT_PAGE.TITLE_NAME}>
      <div className="chat-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="chat-wrap">
                {room && (
                  <ul className="chat-list">
                    {room.messages.map((message, idx) => {
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
                                  <h5>
                                    {message.isUserSender ? "Me" : "Admin"}
                                  </h5>
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
            </div>
          </div>
        </div>
        <div className="chat-submission">
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder={
                  SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.PLACEHOLDER
                }
                {...formMethods.register(
                  SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY,
                  { required: true }
                )}
              />
              <div className="buttons">
                <button className="submit">
                  {isLoading ? (
                    <Loader size={21} className={"chat_submit_btn"} />
                  ) : (
                    <FaRegPaperPlane />
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </PageLayout>
  );
};
