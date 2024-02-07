import { RoleType } from "../enum/RoleType";
import { StatusType } from "../enum/StatusType";
export class User {
    public id?: number;
    public password?: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: RoleType;
    public status: StatusType;
    constructor(email: string, firstName: string, lastName: string, password: string, role?: RoleType, status?: StatusType) {
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role || RoleType.Author;
        this.status = status || StatusType.Active;
    }
}