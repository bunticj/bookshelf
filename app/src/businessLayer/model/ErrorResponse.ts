import { IErrorResponseData } from "../interface/HelperInterface";

export class ErrorResponse {
    data: IErrorResponseData;
    status: number;
    constructor(data: IErrorResponseData, status: number) {
        this.data = data;
        this.status = status || 500;
    }
}