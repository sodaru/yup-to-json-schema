import { boolean } from "yup";
import { convertSchema } from "../src";
import { describe, test, expect } from "vitest";

describe("boolean converter", () => {
  test("type", () => {
    expect(convertSchema(boolean())).toStrictEqual({ type: "boolean" });
  });
});
