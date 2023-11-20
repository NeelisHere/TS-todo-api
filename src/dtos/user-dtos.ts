import { UserDocType } from "../utils/utils.js";

class UserDTOS {
    id: string; 
    username: string; 
    email: string;
    constructor(user: UserDocType) {
        const { _id, username, email } = user
        this.id = _id;
        this.username = username;
        this.email = email;
    }
}

export default UserDTOS 