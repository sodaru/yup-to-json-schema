import { boolean, mixed, string } from "yup";
import yupToJsonSchema from "../src";

describe("mixed type conversion", () => {
  test("default", () => {
    expect(yupToJsonSchema(string())).toStrictEqual({
      type: "string"
    });
  });
  test("oneOf", () => {
    expect(yupToJsonSchema(string().oneOf(["A", "B"]))).toStrictEqual({
      type: "string",
      enum: ["A", "B"]
    });
  });
  test("notOneOf", () => {
    expect(yupToJsonSchema(string().notOneOf(["A", "B"]))).toStrictEqual({
      type: "string",
      not: { enum: ["A", "B"] }
    });
  });
  test("description", () => {
    expect(
      yupToJsonSchema(string().meta({ description: "A description here" }))
    ).toStrictEqual({
      type: "string",
      description: "A description here"
    });
  });

  test("expect error on invalid type", () => {
    const yupSchema = mixed();
    expect(() => yupToJsonSchema(yupSchema)).toThrowError("unknown type");
  });

  test("mixed with description and examples", () => {
    expect(
      yupToJsonSchema(
        boolean().meta({
          description: "test",
          example: true,
          jsonSchema: { test: true }
        })
      )
    ).toStrictEqual({
      type: "boolean",
      description: "test",
      examples: [true],
      test: true
    });
  });
});
