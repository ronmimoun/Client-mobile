import { FaRegPaperPlane } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { userSelectors } from "../../store/user/user.selectors";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useUpdateEffect } from "../../hooks/useEffectUpdate";
import { supportChatApiService } from "../../services/http/api/supportChat.api.service";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { SupportChatModel } from "../../types/entities/support-chat/roomChat.type";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../constants/popup.constants";
import {
  SUPPORT_CHAT_FORM_CONFIG,
  SUPPORT_CHAT_FORM_SCHEMA,
  SupportChatForm,
} from "../../form/schemas/SupportChatSchema";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../../components/ui/Preloader/Loader";
import { SupportChatMessages } from "./SupportChatMessages/SupportChatMessages";

export const SupportChat = () => {
  const currentUserId = useSelector(userSelectors.currentUserId);
  const [supportChat, setSupportChat] = useState<SupportChatModel | null>(null);
  const formMethods = useForm<SupportChatForm>({
    defaultValues: {
      [SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY]:
        SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.DEFAULT_VALUE,
    },
    resolver: zodResolver(SUPPORT_CHAT_FORM_SCHEMA),
  });
  const { handleScrollToBottom } = useScrollToBottom();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    formMethods.setFocus(SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY);
    loadSupportChat();
  }, []);

  useUpdateEffect(() => {
    handleScrollToBottom();
    formMethods.setFocus(SUPPORT_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY);
  }, [supportChat]);

  const loadSupportChat = useCallback(async () => {
    const currentUserChatSupport = await supportChatApiService.getById(
      currentUserId!
    );

    if (
      !currentUserChatSupport.isSucceeded ||
      !currentUserChatSupport.data?.content
    )
      return toast.error(POPUP_MESSAGE.SUPPORT_CHAT.AN_PROBLEM_OCCURRED);

    setSupportChat(currentUserChatSupport.data.content);
  }, [currentUserId]);

  const onSubmit = useCallback(
    async ({ message }: SupportChatForm) => {
      if (!supportChat) return;
      setIsLoading(true);

      const messageResponse = await supportChatApiService.sendMessage({
        chatId: supportChat._id,
        isUserSender: true,
        message,
        userId: currentUserId!,
      });
      setIsLoading(false);

      if (!messageResponse.isSucceeded || !messageResponse.data?.content)
        return toast.error(POPUP_MESSAGE.SUPPORT_CHAT.AN_PROBLEM_OCCURRED);

      setSupportChat({
        ...supportChat,
        messages: [...supportChat.messages, messageResponse.data.content],
      });
      formMethods.reset();
    },
    [supportChat, currentUserId]
  );

  return (
    <PageLayout title={PAGES_TITLE.SUPPORT_CHAT_PAGE.TITLE_NAME}>
      <div className="chat-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SupportChatMessages supportChat={supportChat} />
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
