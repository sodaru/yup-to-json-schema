import { array, string } from "yup";
import { convertSchema } from "../src";

describe("array converter", () => {
  test("type", () => {
    expect(convertSchema(array())).toStrictEqual({ type: "array" });
  });

  test("items", () => {
    expect(convertSchema(array().of(string()))).toStrictEqual({
      type: "array",
      items: { type: "string" }
    });
  });

  test("length", () => {
    expect(convertSchema(array().length(3))).toStrictEqual({
      type: "array",
      maxItems: 3,
      minItems: 3
    });
  });

  test("min", () => {
    expect(convertSchema(array().min(3))).toStrictEqual({
      type: "array",
      minItems: 3
    });
  });

  test("max", () => {
    expect(convertSchema(array().max(3))).toStrictEqual({
      type: "array",
      maxItems: 3
    });
  });
});
