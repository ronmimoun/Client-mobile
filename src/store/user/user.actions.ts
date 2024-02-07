import { userSlice } from "./user.reducer"
import { userThunkActions } from "./user.thunk-builder"

export const userActions = {
    ...userSlice.actions,
    ...userThunkActions
}