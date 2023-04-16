import { string, array, object, date, boolean, number } from "yup";
import { convertSchema } from "../src";

const schema = string();

describe("common converter", () => {
  test("type", () => {
    expect(convertSchema(schema)).toStrictEqual({
      type: "string"
    });
  });

  test("nullable", () => {
    expect(convertSchema(schema.nullable())).toStrictEqual({
      type: ["string", "null"]
    });
  });

  test("oneOf", () => {
    expect(convertSchema(schema.oneOf(["1", "2"]))).toStrictEqual({
      type: "string",
      enum: ["1", "2"]
    });
  });

  test("notOneOf", () => {
    expect(convertSchema(schema.notOneOf(["1", "2"]))).toStrictEqual({
      type: "string",
      not: {
        enum: ["1", "2"]
      }
    });
  });

  test("label", () => {
    expect(convertSchema(schema.label("Label"))).toStrictEqual({
      type: "string",
      title: "Label"
    });
  });

  test("default", () => {
    expect(convertSchema(schema.default("1"))).toStrictEqual({
      type: "string",
      default: "1"
    });
  });

  test("default (function)", () => {
    expect(convertSchema(schema.default(() => "1"))).toStrictEqual({
      type: "string",
      default: "1"
    });
  });

  test("meta jsonSchema", () => {
    const jsonSchema = { test: true };

    expect(convertSchema(string().meta({ jsonSchema }))).toStrictEqual({
      type: "string",
      test: true
    });

    expect(convertSchema(array().meta({ jsonSchema }))).toStrictEqual({
      type: "array",
      test: true
    });

    expect(convertSchema(object().meta({ jsonSchema }))).toStrictEqual({
      type: "object",
      test: true
    });

    expect(convertSchema(date().meta({ jsonSchema }))).toStrictEqual({
      type: "string",
      format: "date-time",
      test: true
    });

    expect(convertSchema(boolean().meta({ jsonSchema }))).toStrictEqual({
      type: "boolean",
      test: true
    });

    expect(convertSchema(number().meta({ jsonSchema }))).toStrictEqual({
      type: "number",
      test: true
    });
  });
});
