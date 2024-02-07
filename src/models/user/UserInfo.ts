import { UserAuthResponse } from "../auth/Login/Login.response"

export class UserInfo {
    userId
    imgUrl
    fullname

    constructor(user: UserAuthResponse) {
        this.userId = user._id
        this.imgUrl = user.imgUrl
        this.fullname = user.fullname
    }
}