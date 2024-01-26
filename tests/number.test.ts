import { number } from "yup";
import { convertSchema } from "../src";
import { describe, test, expect } from "vitest";

describe("number converter", () => {
  test("type", () => {
    expect(convertSchema(number())).toStrictEqual({ type: "number" });
  });

  test("type (integer)", () => {
    expect(convertSchema(number().integer())).toStrictEqual({
      type: "integer"
    });
  });

  test("type (nullable integer)", () => {
    expect(convertSchema(number().nullable().integer())).toStrictEqual({
      type: ["null", "integer"]
    });
  });

  test("min", () => {
    expect(convertSchema(number().min(1))).toStrictEqual({
      type: "number",
      minimum: 1
    });
  });

  test("lessThan", () => {
    expect(convertSchema(number().lessThan(1))).toStrictEqual({
      type: "number",
      exclusiveMaximum: 1
    });
  });

  test("max", () => {
    expect(convertSchema(number().max(1))).toStrictEqual({
      type: "number",
      maximum: 1
    });
  });

  test("moreThan", () => {
    expect(convertSchema(number().moreThan(1))).toStrictEqual({
      type: "number",
      exclusiveMinimum: 1
    });
  });

  test("positive", () => {
    expect(convertSchema(number().positive())).toStrictEqual({
      type: "number",
      exclusiveMinimum: 0
    });
  });

  test("negative", () => {
    expect(convertSchema(number().negative())).toStrictEqual({
      type: "number",
      exclusiveMaximum: 0
    });
  });
});
