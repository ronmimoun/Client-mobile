import { io } from "socket.io-client";
import { getBaseSocketUrl } from "../../utils/api.utils";

function initialSocketConnection() {
  const url = getBaseSocketUrl();
  const socket = io(url);
  return socket;
}

export const socketService = {
  initialSocketConnection,
};
