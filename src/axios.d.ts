import 'axios'
import { CustomRequestConfig } from './types/request/RequestOptions'

declare module 'axios' {
    export interface AxiosRequestConfig extends CustomRequestConfig { }
}