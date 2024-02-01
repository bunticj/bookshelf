export interface IQuery<T> {
    getEntityByNumber(numberId: number): Promise<T | undefined>;
    getEntityByString(stringId: string): Promise<T | undefined>;
    updateEntity(data: T): Promise<T>;
    createEntity(data: T): Promise<void>;
    deleteEntity(id: number): Promise<void>;
}
