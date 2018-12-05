import { DEFAULT_PROPERTY_NAME, GLOBAL_TYPES } from "./decorators";

export class JsonSerializer {
  constructor() {}

  public deserialize(json: string, constructorFn?: new () => any): any {
    const jsonObject = JSON.parse(json);
    return this.deserializeObject(jsonObject, constructorFn);
  }

  public serialize(object: any): string {
    const json = JSON.parse(JSON.stringify(object));
    json[DEFAULT_PROPERTY_NAME] = object[DEFAULT_PROPERTY_NAME];
    return JSON.stringify(json);
  }

  private deserializeArray(jsonObject: any): Array<any> {
    const array = jsonObject as Array<any>;
    return array.map(element => {
      return this.deserializeObject(element);
    });
  }

  private deserializeObject(
    jsonObject: any,
    constructorFn?: new () => any,
    objectValue?: any
  ): any {
    let result: any = null;
    if (GLOBAL_TYPES[jsonObject[DEFAULT_PROPERTY_NAME]]) {
      result = new GLOBAL_TYPES[jsonObject[DEFAULT_PROPERTY_NAME]]() as any;
    } else if (constructorFn) {
      result = new constructorFn();
    } else if (objectValue) {
      result = objectValue;
    } else {
      console.error(
        "cannot determine object type, default Object type will be used at your own risk.  " +
          "Maybe you can instantiate the property using this object: " +
          JSON.stringify(jsonObject)
      );
      result = Object.create({});
    }

    Object.getOwnPropertyNames(jsonObject).map(property => {
      if (jsonObject[property] instanceof Array) {
        result[property] = this.deserializeArray(jsonObject[property]);
      } else if (jsonObject[property] instanceof Object) {
        result[property] = this.deserializeObject(
          jsonObject[property],
          (constructorFn = undefined),
          (objectValue = result[property])
        );
      } else {
        result[property] = jsonObject[property];
      }
    });

    return result;
  }
}
