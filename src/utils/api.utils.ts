export function getBaseURl() {
  return process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_APP_SERVER_BASE_URL +
        import.meta.env.VITE_APP_PROD_PORT +
        "/api/"
    : import.meta.env.VITE_APP_LOCAL_BASE_URL +
        import.meta.env.VITE_APP_DEV_PORT +
        "/api/";
}

export function getBaseSocketUrl() {
  return process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_APP_SERVER_BASE_URL +
        import.meta.env.VITE_APP_SOCKET_PORT
    : import.meta.env.VITE_APP_LOCAL_BASE_URL +
        import.meta.env.VITE_APP_SOCKET_PORT;
}

export const buildResponse = <T>(
  isSucceeded: boolean,
  data: T
): GenericResponse<T> => {
  return { isSucceeded, data };
};

export type GenericResponse<T> = {
  isSucceeded: boolean;
  data: T;
};
