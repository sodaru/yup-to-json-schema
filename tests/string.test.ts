import { string } from "yup";
import { convertSchema } from "../src";
import { uuidRegExPattern } from "../src/converters/string";
import { describe, test, expect } from "vitest";

describe("string converter", () => {
  test("type", () => {
    expect(convertSchema(string())).toStrictEqual({
      type: "string"
    });
  });

  test("length", () => {
    expect(convertSchema(string().length(1))).toStrictEqual({
      type: "string",
      minLength: 1,
      maxLength: 1
    });
  });

  test("min", () => {
    expect(convertSchema(string().min(1))).toStrictEqual({
      type: "string",
      minLength: 1
    });
  });

  test("max", () => {
    expect(convertSchema(string().max(1))).toStrictEqual({
      type: "string",
      maxLength: 1
    });
  });

  test("matches", () => {
    expect(convertSchema(string().matches(/\d{10}/gi))).toStrictEqual({
      type: "string",
      pattern: "\\d{10}"
    });
  });

  test("email", () => {
    expect(convertSchema(string().email())).toStrictEqual({
      type: "string",
      format: "email"
    });
  });

  test("url", () => {
    expect(convertSchema(string().url())).toStrictEqual({
      type: "string",
      format: "uri"
    });
  });

  test("uuid", () => {
    expect(convertSchema(string().uuid())).toStrictEqual({
      type: "string",
      format: "uuid",
      pattern: uuidRegExPattern
    });
  });
});
