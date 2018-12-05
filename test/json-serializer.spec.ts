import {
  Bar,
  Foo,
  Dummy,
  StandardObject,
  StandardObjectWithStandardObject,
  StandardObjectWithDecoratedObject,
  StandardObjectWithStandardObjectNotInitialized
} from "../test/foobar";

import { JsonSerializer } from "../src/json-serializer";

describe("JsonSerializerService", () => {
  it("should be created", () => {
    const service = new JsonSerializer();
    expect(service).toBeTruthy();
  });

  it("expect serialization property added", () => {
    const bar = new Bar();
    expect(bar["type"]).toBe("bar");
    const foo = new Foo();
    expect(foo["type"]).toBe("foo");
  });

  it("expect serialization work", () => {
    const bar = new Bar();
    expect(bar["type"]).toBe("bar");
    const service = new JsonSerializer();
    expect(service.serialize(bar)).toBe('{"type":"bar"}');
  });

  it("expect deserialization work", () => {
    let json = '{"type":"bar"}';
    const service = new JsonSerializer();
    expect(service.deserialize(json)).toEqual(jasmine.any(Bar));

    json = '{"type":"foo"}';
    expect(service.deserialize(json)).toEqual(jasmine.any(Foo));
  });

  it("deserialize object without decorator", () => {
    const json = '{"value": 42}';
    const service = new JsonSerializer();
    const object = service.deserialize(json, StandardObject);
    expect(object).toEqual(jasmine.any(StandardObject));
    expect(object.value).toEqual(42);
  });

  it("deserialize object without decorator but containing an object with decorator", () => {
    const json = '{"barValue": {"type": "bar"}}';
    const service = new JsonSerializer();
    const object = service.deserialize(json, StandardObjectWithDecoratedObject);
    expect(object).toEqual(jasmine.any(StandardObjectWithDecoratedObject));
    expect((object as StandardObjectWithDecoratedObject).barValue).toEqual(
      jasmine.any(Bar)
    );
  });

  it("deserialize object without decorator but containing an object without decorator", () => {
    const json = '{"objectValue": {"value": 12}}';
    const service = new JsonSerializer();
    const object = service.deserialize(json, StandardObjectWithStandardObject);
    expect(object).toEqual(jasmine.any(StandardObjectWithStandardObject));
    expect((object as StandardObjectWithStandardObject).objectValue).toEqual(
      jasmine.any(StandardObject)
    );
    expect(
      (object as StandardObjectWithStandardObject).objectValue.value
    ).toEqual(12);
  });

  it(
    "deserialize object without decorator but containing an object without decorator but not " +
      "initialized pop a error message and cannot determine type",
    () => {
      const json = '{"objectValue": {"value": 12}}';
      const service = new JsonSerializer();
      const object = service.deserialize(
        json,
        StandardObjectWithStandardObjectNotInitialized
      );
      expect(object).toEqual(
        jasmine.any(StandardObjectWithStandardObjectNotInitialized)
      );
      expect(
        (object as StandardObjectWithStandardObjectNotInitialized).objectValue
      ).toEqual(jasmine.any(Object));
      expect(
        (object as StandardObjectWithStandardObjectNotInitialized).objectValue
          .value
      ).toEqual(12);
    }
  );

  it("expect deserialization of alls work", () => {
    const json = '{"type":"dummy","entities":[{"type":"bar"},{"type":"foo"}]}';
    const service = new JsonSerializer();
    const object = service.deserialize(json);

    expect(object).toEqual(jasmine.any(Dummy));
    expect((object as Dummy).entities[0]).toEqual(jasmine.any(Bar));
    expect((object as Dummy).entities[1]).toEqual(jasmine.any(Foo));
  });
});
