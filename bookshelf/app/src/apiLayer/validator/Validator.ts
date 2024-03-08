import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { IPagination } from "../../businessLayer/interface/HelperInterface";
import { Book } from "../../businessLayer/model/Book";
import { CustomError } from "../../businessLayer/model/CustomError";
import { User } from "../../businessLayer/model/User";
import { ErrorHandler } from "../../businessLayer/utils/ErrorHandler";
class Validator {
    /**
     * Validates string properties of a user object.
     * @param {Partial<User>} body - The partial user object to validate.
     * @param {boolean} isUpdate - Indicates whether the validation is for an update operation.
     * @throws {CustomError} Throws a validation error if any property fails validation.
     */
    public validateUserStrings(body: Partial<User>, isUpdate: boolean): void {
        const maxStringLength = 64;
        const propertyNames: string[] = Object.getOwnPropertyNames(User.prototype)
            .filter((key) => typeof (User.prototype as any)[key] === 'string');
        this.validateStrings(propertyNames, body, isUpdate, maxStringLength);
    }

    /**
     * Validates string properties of a user object.
     * @param {Partial<User>} body - The partial user object to validate.
     * @param {boolean} isUpdate - Indicates whether the validation is for an update operation.
     * @throws {CustomError} Throws a validation error if any property fails validation.
     */
    public validateBookStrings(body: Partial<Book>, isUpdate: boolean): void {
        const maxStringLength = 32;
        const propertyNames: string[] = Object.getOwnPropertyNames(Book.prototype)
            .filter((key) => typeof (Book.prototype as any)[key] === 'string');
        this.validateStrings(propertyNames, body, isUpdate, maxStringLength);
    }

    public validateEnums<T>(value: T, enumValues: T[]) {
        if (value && !enumValues.includes(value)) throw new CustomError(ErrorType.ValidationError, `Unexisting enum:  ${value}`, { value });
    }

    /**
     *
     * Validates pagination query parameters and returns the parsed pagination object.
     * If the provided parameters are invalid or cannot be parsed, default values are used.
     * @param {any} page - The page number parameter.
     * @param {any} size - The page size parameter.
     * @returns {IPagination} The parsed pagination object containing the page number and total pages.
     */
    public validatePaginationQuery(page: any, size: any): IPagination {
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
        return { page: parsedPageNum, totalPages: parsedSizeNum };

    }

    /**
     * Validates string properties in the provided data object.
     * Throws a validation error if a property is missing, not a string, or exceeds the maximum length.
     * @param {string[]} keys - The list of keys representing string properties to validate.
     * @param {object} data - The data object containing the properties to validate.
     * @param {boolean} isUpdate - Indicates whether the validation is for an update operation.
     * @param {number} [maxLength] - The maximum length allowed for string properties.
     * @throws {CustomError} Throws a validation error if any property fails validation.
     */
    private validateStrings(keys: string[], data: object, isUpdate: boolean, maxLength?: number): void {
        keys.forEach(key => {
            const value = (data as any)[key];
            if (!isUpdate && !value) return;
            if (!value || typeof value !== 'string') throw new CustomError(ErrorType.ValidationError, `Invalid ${key}`, { key: value });
            else if (maxLength && value.length > maxLength) throw new CustomError(ErrorType.ValidationError, `Invalid ${key},  must be shorther then ${maxLength}`, { key, value, maxLength });
        });
    }

}

export const validator = new Validator();