import { StatusType } from "../enum/StatusType";

export class Book {
    public id?: number;
    public author_id: number;
    public title: string;
    public publisher: string;
    public status_type: StatusType;
    constructor(author_id: number, title: string, publisher: string, status_type = StatusType.Active) {
        this.author_id = author_id;
        this.title = title;
        this.publisher = publisher;
        this.status_type = status_type;
    }
}