/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GENERAL_API_TIMEOUT_IN_SECONDS: string;
    readonly SERVER_BASE_URL: string;
    readonly LOCAL_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}