import { date } from "yup";
import yupToJsonSchema from "../src";

describe("date type conversion", () => {
  test("simple date", () => {
    expect(yupToJsonSchema(date())).toStrictEqual({
      type: "string",
      format: "date-time"
    });
  });
});
