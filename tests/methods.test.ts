import { addMethod, Schema, string } from "yup";
import { extendSchema, convertSchema } from "../src";

describe("extends methods", () => {
  extendSchema({ addMethod, Schema });

  test("example", () => {
    expect(convertSchema(string().example("1"))).toStrictEqual({
      type: "string",
      example: "1"
    });
  });

  test("examples", () => {
    expect(convertSchema(string().examples(["1"]))).toStrictEqual({
      type: "string",
      examples: ["1"]
    });
  });

  test("description", () => {
    expect(convertSchema(string().description("1"))).toStrictEqual({
      type: "string",
      description: "1"
    });
  });

  test("jsonSchema", () => {
    expect(
      convertSchema(
        string()
          .meta({ jsonSchema: { default: "default" } })
          .jsonSchema(jsonSchema => {
            return {
              ...jsonSchema,
              test: true
            };
          })
      )
    ).toStrictEqual({
      type: "string",
      default: "default",
      test: true
    });
  });
});
