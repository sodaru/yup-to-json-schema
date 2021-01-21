import { number } from "yup";
import yupToJsonSchema from "../src";

describe("number type conversion", () => {
  test("simple number", () => {
    expect(yupToJsonSchema(number())).toStrictEqual({ type: "number" });
  });

  test("number with min", () => {
    expect(yupToJsonSchema(number().min(2))).toStrictEqual({
      type: "number",
      minimum: 2
    });
  });

  test("number with max", () => {
    expect(yupToJsonSchema(number().max(2))).toStrictEqual({
      type: "number",
      maximum: 2
    });
  });

  test("number with lessThan", () => {
    expect(yupToJsonSchema(number().lessThan(2))).toStrictEqual({
      type: "number",
      exclusiveMaximum: 2
    });
  });

  test("number with moreThan", () => {
    expect(yupToJsonSchema(number().moreThan(2))).toStrictEqual({
      type: "number",
      exclusiveMinimum: 2
    });
  });

  test("number with negative", () => {
    expect(yupToJsonSchema(number().negative())).toStrictEqual({
      type: "number",
      exclusiveMaximum: 0
    });
  });

  test("number with positive", () => {
    expect(yupToJsonSchema(number().positive())).toStrictEqual({
      type: "number",
      exclusiveMinimum: 0
    });
  });

  test("number with integer", () => {
    expect(yupToJsonSchema(number().integer())).toStrictEqual({
      type: "number",
      multipleOf: 1
    });
  });
});
