import { string } from "yup";
import yupToJsonSchema from "../src";

describe("string type conversion", () => {
  test("simple string", () => {
    expect(yupToJsonSchema(string())).toStrictEqual({ type: "string" });
  });

  test("string with length", () => {
    expect(yupToJsonSchema(string().length(2))).toStrictEqual({
      type: "string",
      minLength: 2,
      maxLength: 2
    });
  });

  test("string with min", () => {
    expect(yupToJsonSchema(string().min(2))).toStrictEqual({
      type: "string",
      minLength: 2
    });
  });

  test("string with max", () => {
    expect(yupToJsonSchema(string().max(2))).toStrictEqual({
      type: "string",
      maxLength: 2
    });
  });

  test("string with matches", () => {
    expect(yupToJsonSchema(string().matches(/\d{10}/gi))).toStrictEqual({
      type: "string",
      pattern: "\\d{10}"
    });
  });

  test("string with email", () => {
    expect(yupToJsonSchema(string().email())).toStrictEqual({
      type: "string",
      format: "email"
    });
  });

  test("string with url", () => {
    expect(yupToJsonSchema(string().url())).toStrictEqual({
      type: "string",
      format: "uri"
    });
  });

  test("string with uuid", () => {
    expect(yupToJsonSchema(string().uuid())).toStrictEqual({
      type: "string",
      format: "uuid",
      pattern:
        "^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$"
    });
  });

  test("string with label", () => {
    expect(yupToJsonSchema(string().label("Your Mom's Name"))).toStrictEqual({
      type: "string",
      description: "Your Mom's Name"
    });
  });

  test("string with description & example", () => {
    expect(
      yupToJsonSchema(
        string().meta({ description: "Your Mom's Name", example: "Karen" })
      )
    ).toStrictEqual({
      type: "string",
      description: "Your Mom's Name",
      examples: ["Karen"]
    });
  });

  test("string with label & description (use the later)", () => {
    expect(
      yupToJsonSchema(
        string().label("Mom's Name").meta({ description: "Your Mom's Name" })
      )
    ).toStrictEqual({
      type: "string",
      description: "Your Mom's Name"
    });
  });

  test("string with multiple examples", () => {
    expect(
      yupToJsonSchema(
        string()
          .label("Your Mom's Name")
          .meta({ examples: ["Karen", "Karen Annoywood"] })
      )
    ).toStrictEqual({
      type: "string",
      description: "Your Mom's Name",
      examples: ["Karen", "Karen Annoywood"]
    });
  });
});
