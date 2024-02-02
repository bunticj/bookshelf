import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";
export class User {
    public id?: number;
    public password: string;
    public first_name: string;
    public last_name: string;
    public email: string
    public role_type: RoleType;
    public status_type: StatusType;
    constructor(email: string, first_name: string, last_name: string, password: string, roleType?: RoleType, statusType?: StatusType) {
        this.password = password;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_type = roleType || RoleType.Author;
        this.status_type = statusType || StatusType.Active;
    }
}