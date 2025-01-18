import { AgentMessageModel } from "../../../types/entities/agent-message/agentMessage.type";
import { UserModel } from "../../../types/entities/user.type";

export type CreateAgentMessageResponse = {
  agentMessage: AgentMessageModel;
  savedUser: UserModel;
};
