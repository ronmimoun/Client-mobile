import classes from "./ContactDetailsAICompanyInfo.module.scss";
import { useCallback, useEffect, useState } from "react";
import { openAIChatApiService } from "../../../../services/http/api/chatGpt.api.service";
import { RenderByBooleanWrapper } from "../../../../components/utils/RenderByBooleanWrapper/RenderByBooleanWrapper";
import { Loader } from "../../../../components/ui/Preloader/Loader";
import { ContactModel } from "../../../../types/contact/contact.type";

const AI_PROMPT = "Explain more about that company: ";

type ContactDetailsAICompanyInfoProps = {
  contact: ContactModel;
};

export const ContactDetailsAICompanyInfo = ({
  contact,
}: ContactDetailsAICompanyInfoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!contact.company) return;

    getCompanyInfo(AI_PROMPT + contact.company);
  }, []);

  const getCompanyInfo = useCallback(async (message: string) => {
    setIsLoading(true);
    const response = await openAIChatApiService.sendMessage(message);
    setIsLoading(false);

    if (!response.isSucceeded || !response.data?.content) return;

    setCurrentMessage(response.data.content.content);
  }, []);

  return (
    <div className={classes.container}>
      <h4>AI Company:</h4>
      <RenderByBooleanWrapper shouldRender={isLoading}>
        <Loader className={classes.container__loader} />
      </RenderByBooleanWrapper>

      <RenderByBooleanWrapper shouldRender={!isLoading && !!currentMessage}>
        <p>{currentMessage}</p>
      </RenderByBooleanWrapper>
    </div>
  );
};
