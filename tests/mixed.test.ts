import { mixed } from "yup";
import { convertSchema } from "../src";

describe("mixed converter", () => {
  test("type", () => {
    expect(convertSchema(mixed())).toStrictEqual({
      type: []
    });
  });

  test("type oneOf", () => {
    const options = ["string", [], {}, null, new Date(), 1];
    // @ts-expect-error options are known
    const schema = mixed().oneOf(options);
    expect(convertSchema(schema)).toStrictEqual({
      enum: options,
      type: ["string", "array", "object", "null", "number"]
    });
  });

  test("type default", () => {
    const schema = mixed().default("string");
    expect(convertSchema(schema)).toStrictEqual({
      default: "string",
      type: ["string"]
    });
  });

  test("type oneOf default", () => {
    const schema = mixed().oneOf([[], 1]).default("string");
    expect(convertSchema(schema)).toStrictEqual({
      default: "string",
      enum: [[], 1],
      type: ["array", "number", "string"]
    });
  });
});
