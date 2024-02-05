import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { Book } from "../../businessLayer/model/Book";
import { CustomError } from "../../businessLayer/model/CustomError";
import { User } from "../../businessLayer/model/User";
import { ErrorHandler } from "../../businessLayer/utils/ErrorHandler";
class Validator {

    public validateUserStrings(body: Partial<User>, isUpdate: boolean) {
        const maxStringLength = 64;
        const propertyNames: string[] = Object.getOwnPropertyNames(User.prototype)
            .filter((key) => typeof (User.prototype as any)[key] === 'string');
        this.validateStrings(propertyNames, body, isUpdate, maxStringLength);
    }

    public validateBookStrings(body: Partial<Book>, isUpdate: boolean) {
        const maxStringLength = 32;
        const propertyNames: string[] = Object.getOwnPropertyNames(Book.prototype)
            .filter((key) => typeof (Book.prototype as any)[key] === 'string');
        this.validateStrings(propertyNames, body, isUpdate, maxStringLength);
    }

    public validateEnums<T>(value: T, enumValues: T[]) {
        if (value && !enumValues.includes(value)) throw new CustomError(ErrorType.ValidationError, `Unexisting enum:  ${value}`, { value });
    }

    public validatePaginationQuery(page: any, size: any): number[] {
        let parsedPageNum = 1;
        let parsedSizeNum = 10;
        try {
            if (page && typeof page === "string") {
                const tryParse = parseInt(page);
                if (!isNaN(tryParse)) parsedPageNum = tryParse;
            }
            if (size && typeof size === "string") {
                const tryParse = parseInt(size);
                if (!isNaN(tryParse) && tryParse <= 50) parsedSizeNum = tryParse;
            }
        } catch (error) {
            ErrorHandler.catchError(error as Error, { page, size });
        }
        finally {
            return [parsedPageNum, parsedSizeNum];
        }

    }

    private validateStrings(keys: string[], data: Object, isUpdate: boolean, maxLength?: number) {
        keys.forEach(key => {
            const value = (data as any)[key];
            if (!isUpdate && !value) return;
            if (!value || typeof value !== 'string') throw new CustomError(ErrorType.ValidationError, `Invalid ${key}`, { key: value });
            else if (maxLength && value.length > maxLength) throw new CustomError(ErrorType.ValidationError, `Invalid ${key},  must be shorther then ${maxLength}`, { key, value, maxLength });
        });
    }

}

export const validator = new Validator();