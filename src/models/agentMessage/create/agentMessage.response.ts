import { AgentMessageModel } from "../../../types/agent-message/agentMessage.type";
import { UserModel } from "../../../types/user.type";

export type CreateAgentMessageResponse = {
  agentMessage: AgentMessageModel;
  savedUser: UserModel;
};
