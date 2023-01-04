import { boolean } from "yup";
import yupToJsonSchema from "../src";

describe("boolean type conversion", () => {
  test("simple boolean", () => {
    expect(yupToJsonSchema(boolean())).toStrictEqual({ type: "boolean" });
  });

  test("boolean with description and examples", () => {
    expect(
      yupToJsonSchema(boolean().meta({ description: "test", example: true }))
    ).toStrictEqual({
      type: "boolean",
      description: "test",
      examples: [true]
    });
  });
});
