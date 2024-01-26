import { array, lazy, string } from "yup";
import { convertSchema } from "../src/index.js";
import { describe, test, expect } from "vitest";

describe("date converter", () => {
  test("type", () => {
    const schema = lazy(() => string());
    expect(convertSchema(schema)).toStrictEqual({
      type: "string"
    });
  });

  test("lazy type", () => {
    const schema = lazy(value => (value === "1" ? string() : array()));
    expect(convertSchema(schema, { value: "1" })).toStrictEqual({
      type: "string"
    });
    expect(convertSchema(schema, { value: "2" })).toStrictEqual({
      type: "array"
    });
  });
});
