import { date } from "yup";
import { convertSchema } from "../src";
import { describe, test, expect } from "vitest";

describe("date converter", () => {
  test("type", () => {
    expect(convertSchema(date())).toStrictEqual({
      type: "string",
      format: "date-time"
    });
  });
});
