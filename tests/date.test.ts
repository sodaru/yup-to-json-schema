import { date } from "yup";
import { convertSchema } from "../src";

describe("date converter", () => {
  test("type", () => {
    expect(convertSchema(date())).toStrictEqual({
      type: "string",
      format: "date-time"
    });
  });
});
