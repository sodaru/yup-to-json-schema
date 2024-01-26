import { tuple, string, array } from "yup";
import { convertSchema } from "../src";
import { describe, test, expect } from "vitest";

describe("tuple converter", () => {
  test("type", () => {
    expect(convertSchema(tuple([string(), array()]))).toStrictEqual({
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: [
        {
          type: "string"
        },
        {
          type: "array"
        }
      ]
    });
  });
});
