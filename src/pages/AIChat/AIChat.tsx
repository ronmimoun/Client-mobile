import classes from "./AIChat.module.scss";
import PageLayout from "../../layout/PageLayout";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputController } from "../../components/form/controllers/InputController";
import { useCallback, useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../../components/ui/PrimaryButton/PrimaryButton";
import { openAIChatApiService } from "../../services/http/api/chatGpt.api.service";
import { FaRegPaperPlane } from "react-icons/fa";
import { OpenAIMessageModel } from "../../types/open-ai-chat/openAIChat.type";
import { ChatMessage, MessageTypeEnum } from "./ChatMessage/ChatMessage";
import { RenderByBoolean } from "../../components/utils/RenderByBoolean/RenderByBoolean";
import { Loader } from "../../components/ui/Preloader/Loader";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useUpdateEffect } from "../../hooks/useEffectUpdate";
import {
  AI_CHAT_FORM_CONFIG,
  AiChatFormSchema,
  AiChatFormType,
} from "../../form/schemas/OpenAIChatSchema";

const AIChat = () => {
  const [messages, setMessages] = useState<OpenAIMessageModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollToElementBottom } = useScrollToBottom();

  useEffect(() => {
    formMethods.setFocus("message");
  }, []);

  useUpdateEffect(() => {
    scrollToElementBottom(containerRef);
  }, [containerRef, messages.length]);

  const formMethods = useForm<AiChatFormType>({
    defaultValues: {
      [AI_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY]:
        AI_CHAT_FORM_CONFIG.INPUTS.MESSAGE.DEFAULT_VALUE,
    },
    resolver: zodResolver(AiChatFormSchema),
  });

  const handleSubmit = useCallback(async ({ message }: AiChatFormType) => {
    formMethods.reset();

    const userMessage: OpenAIMessageModel = {
      role: MessageTypeEnum.USER,
      content: message,
    };

    setMessages((prevState) => [...prevState, userMessage]);

    setIsLoading(true);
    const response = await openAIChatApiService.sendMessage(message);
    setIsLoading(false);

    if (!response.isSucceeded || !response.data?.content) return;

    const openAIChatResponse = response.data.content;
    setMessages((prevState) => [...prevState, openAIChatResponse]);
  }, []);

  return (
    <PageLayout
      title={PAGES_TITLE.AI_CHAT_PAGE.TITLE_NAME}
      className={classes.container}
    >
      <div className={classes.wrapper}>
        <div className={classes.wrapper__chat} ref={containerRef}>
          {messages.map((message, idx) => {
            return <ChatMessage key={idx} message={message} />;
          })}
        </div>

        <FormProvider {...formMethods}>
          <form
            className={classes.form}
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <InputController
              name={AI_CHAT_FORM_CONFIG.INPUTS.MESSAGE.KEY}
              autoComplete="off"
            />
            <PrimaryButton className={classes.form__button} type="submit">
              <RenderByBoolean shouldRender={!isLoading}>
                <FaRegPaperPlane />
              </RenderByBoolean>
              <RenderByBoolean shouldRender={isLoading}>
                <Loader size={21} className={classes.form__loader} />
              </RenderByBoolean>
            </PrimaryButton>
          </form>
        </FormProvider>
      </div>
    </PageLayout>
  );
};

export default AIChat;
