import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";
export class UserAccount {
    public id?: number;
    public password: string;
    public email: string
    public role_type: number;
    public status_type: number;
    constructor(email: string, password: string, roleType?: RoleType, statusType?: StatusType) {
        this.password = password;
        this.email = email;
        this.role_type = roleType || RoleType.Regular;
        this.status_type = statusType || StatusType.Activated;
    }
}