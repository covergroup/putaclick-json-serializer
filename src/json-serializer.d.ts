export declare class JsonSerializer {
    constructor();
    deserialize(json: string, constructorFn?: new () => any): any;
    serialize(object: any): string;
    private deserializeArray;
    private deserializeObject;
}
