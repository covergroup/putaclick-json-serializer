import { JsonSubType } from "../src/decorators";

export class StandardObject {
  public value: number;
}

export abstract class FooBar {}

@JsonSubType("foo")
export class Foo extends FooBar {}

@JsonSubType("bar")
export class Bar extends FooBar {}

@JsonSubType("dummy")
export class Dummy {
  public constructor(public entities: FooBar[]) {}
}

export class StandardObjectWithStandardObject {
  public objectValue = new StandardObject();
}

export class StandardObjectWithStandardObjectNotInitialized {
  public objectValue: StandardObject;
}

export class StandardObjectWithDecoratedObject {
  public barValue: Bar = new Bar();
}
