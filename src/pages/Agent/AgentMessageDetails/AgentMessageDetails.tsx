import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import { userSelectors } from "../../../store/user/user.selectors";
import { AgentMessageModel } from "../../../types/agent-message/agentMessage.type";
import {
  AGENT_MESSAGE_DETAILS_FORM_CONFIG,
  AGENT_MESSAGE_DETAILS_FORM_SCHEMA,
  AgentMessageDetailsForm,
} from "../../../form/schemas/AgentMessageDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { toast } from "react-toastify";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { LoadingButton } from "../../../components/ui/LoadingButton/LoadingButton";
import { userActions } from "../../../store/user/user.actions";
import { CreateAgentMessageRequest } from "../../../models/agentMessage/create/agentMessage.request";
import { useAppDispatch } from "../../../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { GenericResponse } from "../../../utils/api.utils";
import { CreateAgentMessageResponse } from "../../../models/agentMessage/create/agentMessage.response";
import { UserModel } from "../../../types/user.type";

const AgentMessageDetails = () => {
  const { categories, jobTitles } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agentMessage, setAgentMessage] = useState<AgentMessageModel | null>(
    null
  );
  const { id: contactId } = useParams();
  const formMethods = useForm<AgentMessageDetailsForm>({
    defaultValues: {
      [AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_COMPANY.KEY]:
        AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_COMPANY.DEFAULT_VALUE,
      [AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_JOB_TITLE.KEY]:
        AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_JOB_TITLE.DEFAULT_VALUE,
      [AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_CATEGORY.KEY]:
        AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_CATEGORY.DEFAULT_VALUE,
      [AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.MESSAGE.KEY]:
        AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.MESSAGE.DEFAULT_VALUE,
    },
    resolver: zodResolver(AGENT_MESSAGE_DETAILS_FORM_SCHEMA),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadAgentMessage();
  }, []);

  useEffect(() => {
    if (agentMessage) loadFormValues();
  }, [agentMessage, formMethods.setValue]);

  const loadAgentMessage = async () => {
    const userAgentMessage = currentUser.agentMessages.find(
      (message) => message.contact._id === contactId
    );

    if (!userAgentMessage) return;

    setAgentMessage(userAgentMessage);
  };

  const loadFormValues = () => {
    if (!agentMessage) return;
    formMethods.setValue("userCompany", agentMessage.userCompany);
    formMethods.setValue("userJobTitle", agentMessage.userJobTitle);
    formMethods.setValue("userCategory", agentMessage.userCategory);
    formMethods.setValue("message", agentMessage.message);
  };

  const onSubmit = async (data: AgentMessageDetailsForm) => {
    const { formState } = formMethods;

    if (Object.keys(formState.errors).length) {
      return toast.error(POPUP_MESSAGE.AGENT_DETAILS.FORM.FILL_ALL_THE_FIELDS);
    }

    const payload = {
      ...data,
      contactId,
    } as CreateAgentMessageRequest;

    setIsLoading(true);
    const agentMessageResponse = (await dispatch(
      userActions.addAgentMessageThunk(payload)
    )) as PayloadAction<
      GenericResponse<CreateAgentMessageResponse | undefined>
    >;
    if (
      !agentMessageResponse.payload.isSucceeded ||
      !agentMessageResponse.payload.data
    )
      return;
    setAgentMessage(agentMessageResponse.payload.data.agentMessage);
    setIsLoading(false);
  };

  const isDisabled = () => {
    return agentMessage ? true : false;
  };

  return (
    <PageLayout title={PAGES_TITLE.AGENT_DETAILS_PAGE.TITLE_NAME}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex gap--15 f-dir-col mx-4">
          <div
            className={`input-container${
              formMethods.formState.errors?.userCompany ? " input-error" : ""
            }`}
          >
            <input
              className="input"
              type="text"
              disabled={isDisabled()}
              placeholder="Your Company Name"
              {...formMethods.register(
                AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_COMPANY
                  .KEY as "userCompany",
                { required: true }
              )}
            />
          </div>

          <div
            className={`select-container${
              formMethods.formState.errors?.userCategory ? " error" : ""
            }`}
          >
            <Controller
              control={formMethods.control}
              name={
                AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_JOB_TITLE
                  .KEY as "userJobTitle"
              }
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Form.Select
                    disabled={isDisabled()}
                    className="select"
                    {...field}
                  >
                    <option>Your job title</option>
                    {jobTitles.map((jobTitle) => {
                      return (
                        <option key={jobTitle._id} value={jobTitle.title}>
                          {jobTitle.title}
                        </option>
                      );
                    })}
                  </Form.Select>
                );
              }}
            />
          </div>

          <div
            className={`select-container${
              formMethods.formState.errors?.userCategory ? " error" : ""
            }`}
          >
            <Controller
              control={formMethods.control}
              name={
                AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.USER_CATEGORY
                  .KEY as "userCategory"
              }
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Form.Select
                    disabled={isDisabled()}
                    className="select"
                    {...field}
                  >
                    <option>Looking for agent in the field of</option>
                    {categories.map((category) => {
                      return (
                        <option key={category._id} value={category.cat}>
                          {category.title}
                        </option>
                      );
                    })}
                  </Form.Select>
                );
              }}
            />
          </div>

          <div
            className={`input-container${
              formMethods.formState.errors?.message ? " input-error" : ""
            }`}
          >
            <label htmlFor="message" className="input-container__label">
              Your message:
            </label>
            <textarea
              id="message"
              className="input"
              disabled={isDisabled()}
              rows={4}
              cols={50}
              {...formMethods.register(
                AGENT_MESSAGE_DETAILS_FORM_CONFIG.INPUTS.MESSAGE
                  .KEY as "message",
                { required: true }
              )}
            ></textarea>
          </div>

          {!agentMessage && (
            <LoadingButton
              className={"button space-mt--30 __h-50"}
              isLoading={isLoading}
            >
              Send
            </LoadingButton>
          )}
        </div>
      </form>
    </PageLayout>
  );
};

export default AgentMessageDetails;
