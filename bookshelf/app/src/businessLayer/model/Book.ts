import { StatusType } from "../enum/StatusType";

export class Book {
    public id?: number;
    public authorId: number;
    public title: string;
    public publisher: string;
    public status: StatusType;
    constructor(authorId: number, title: string, publisher: string, status = StatusType.Active) {
        this.authorId = authorId;
        this.title = title;
        this.publisher = publisher;
        this.status = status;
    }
}