import { boolean } from "yup";
import { convertSchema } from "../src";

describe("boolean converter", () => {
  test("type", () => {
    expect(convertSchema(boolean())).toStrictEqual({ type: "boolean" });
  });
});
