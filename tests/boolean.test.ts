import { boolean } from "yup";
import yupToJsonSchema from "../src";

describe("boolean type conversion", () => {
  test("simple boolean", () => {
    expect(yupToJsonSchema(boolean())).toStrictEqual({ type: "boolean" });
  });
});
