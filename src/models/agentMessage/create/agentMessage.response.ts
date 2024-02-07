import { AgentMessageModel } from "../../../types/agent-message/agentMessage.type";
import { UserAuthResponse } from "../../auth/Login/Login.response";

export type CreateAgentMessageResponse = {
  agentMessage: AgentMessageModel;
  savedUser: UserAuthResponse;
};
