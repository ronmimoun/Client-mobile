import { globalSlice } from "./global.reducer"
import { globalThunkActions } from "./global.thunk-builder"

export const globalActions = {
    ...globalSlice.actions,
    ...globalThunkActions
}