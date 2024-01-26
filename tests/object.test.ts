import { object, string, array, boolean, date, number } from "yup";
import { convertSchema } from "../src";
import { describe, test, expect } from "vitest";

describe("object converter", () => {
  test("type", () => {
    expect(convertSchema(object())).toStrictEqual({
      type: "object"
    });
  });

  test("type converters", () => {
    const schema = object({
      string: string(),
      array: array(),
      boolean: boolean(),
      date: date(),
      number: number(),
      object: object()
    });
    expect(convertSchema(schema)).toStrictEqual({
      type: "object",
      default: {
        string: undefined,
        array: undefined,
        boolean: undefined,
        date: undefined,
        number: undefined,
        object: undefined
      },
      properties: {
        string: { type: "string" },
        array: { type: "array" },
        boolean: { type: "boolean" },
        date: { type: "string", format: "date-time" },
        number: { type: "number" },
        object: { type: "object" }
      }
    });
  });

  test("default", () => {
    const schema = object({
      string: string()
    });

    expect(convertSchema(schema.default(undefined))).toStrictEqual({
      type: "object",
      properties: {
        string: { type: "string" }
      }
    });

    expect(convertSchema(schema.default({ string: "string" }))).toStrictEqual({
      type: "object",
      default: { string: "string" },
      properties: {
        string: { type: "string" }
      }
    });

    const defaultPropSchema = object({
      string: string().default("1")
    });
    expect(convertSchema(defaultPropSchema)).toStrictEqual({
      type: "object",
      default: { string: "1" },
      properties: {
        string: {
          default: "1",
          type: "string"
        }
      }
    });
  });

  test("required", () => {
    const schema = object({
      string1: string().required(),
      string2: string().required(),
      string3: string()
    });
    expect(convertSchema(schema.default(undefined))).toStrictEqual({
      type: "object",
      required: ["string1", "string2"],
      properties: {
        string1: { type: "string" },
        string2: { type: "string" },
        string3: { type: "string" }
      }
    });
  });
});
