import { ErrorType } from "../../businessLayer/enum/ErrorType";
import { IDictionary } from "../../businessLayer/interface/HelperInterface";
import { CustomError } from "../../businessLayer/model/CustomError";

export const validateStrings = (keys: string[], body: IDictionary<string>) => {
    keys.forEach(key => {
        const value = body[key];
        if (!value || typeof value !== 'string') throw new CustomError(ErrorType.ValidationError, `Invalid ${key}`, { key: value });
    });
}

export const validateStringLengths = (values: string[], lengths: number[]) => {
    let validIndex = 0;
    values.forEach((value, index) => {
        if (lengths[index]) validIndex = index
        const maxLength = lengths[validIndex];
        if (value.length > maxLength) throw new CustomError(ErrorType.ValidationError, `Value ${value} must be shorther then ${maxLength}`, { value, maxLength });
    });
}

export const validateIntegers = (keys: string[], body: IDictionary<number>) => {
    keys.forEach(key => {
        const value = body[key];
        if (value === undefined || !Number.isInteger(value)) throw new CustomError(ErrorType.ValidationError, `Invalid ${key}`, { key: value });
    });
}
