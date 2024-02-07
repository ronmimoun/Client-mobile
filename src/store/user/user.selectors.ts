import { RootState } from "../root.reducers"


const currentUser = () => {
    return (state: RootState) => {
        return state.user.currentUser
    }
}

export const userSelectors = {
    currentUser
}