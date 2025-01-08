
export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>
}           