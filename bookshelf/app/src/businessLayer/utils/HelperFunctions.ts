
export function getPropertyStringNames<T>(classConstructor: { new(): T }): string[] {
    const propertyNames: string[] = Object.getOwnPropertyNames(classConstructor.prototype)
        .filter((key) => typeof (classConstructor.prototype as any)[key] === 'string');
    return propertyNames;
}