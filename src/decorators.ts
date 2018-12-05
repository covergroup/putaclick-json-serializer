export const GLOBAL_TYPES: any = {};
export const DEFAULT_PROPERTY_NAME = "type";

export function JsonSubType(value: string): any {
  return function(target: any) {
    target.prototype[DEFAULT_PROPERTY_NAME] = value;
    GLOBAL_TYPES[value] = target;
  };
}
