import { array, string } from "yup";
import yupToJsonSchema from "../src";

describe("array type conversion", () => {
  test("simple array", () => {
    expect(yupToJsonSchema(array())).toStrictEqual({ type: "array" });
  });

  test("array with items type", () => {
    expect(yupToJsonSchema(array().of(string()))).toStrictEqual({
      type: "array",
      items: { type: "string" }
    });
  });

  test("array with length", () => {
    expect(yupToJsonSchema(array().length(2))).toStrictEqual({
      type: "array",
      maxItems: 2,
      minItems: 2
    });
  });

  test("array with min", () => {
    expect(yupToJsonSchema(array().min(2))).toStrictEqual({
      type: "array",
      minItems: 2
    });
  });

  test("array with max", () => {
    expect(yupToJsonSchema(array().max(2))).toStrictEqual({
      type: "array",
      maxItems: 2
    });
  });

  test("array with description and examples", () => {
    expect(
      yupToJsonSchema(
        array().meta({
          description: "test",
          examples: [21, 42, 63, 84],
          jsonSchema: { test: true }
        })
      )
    ).toStrictEqual({
      type: "array",
      description: "test",
      examples: [21, 42, 63, 84],
      test: true
    });
  });
});
