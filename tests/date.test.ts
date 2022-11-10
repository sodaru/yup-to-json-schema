import { date } from "yup";
import yupToJsonSchema from "../src";

describe("date type conversion", () => {
  test("simple date", () => {
    expect(yupToJsonSchema(date())).toStrictEqual({
      type: "string",
      format: "date-time"
    });
  });

  test("date with description and examples", () => {
    expect(yupToJsonSchema(date().meta({ description: "test", examples: ['2022-11-10', '2022-11-11'] }))).toStrictEqual({
      type: "string",
      format: "date-time",
      description: "test",
      examples: ['2022-11-10', '2022-11-11']
    });
  });
});
