import { JSONSchema7 } from "json-schema";
import Converter from "./Converter";

const uuidRegExPattern =
  "^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$";

const stringConverter: Converter = string => {
  const jsonSchema: JSONSchema7 = {};
  string.tests.forEach(test => {
    switch (test.OPTIONS.name) {
      case "length":
        // @ts-expect-error params  type is expected to be right
        jsonSchema.minLength = test.OPTIONS.params.length;
        // @ts-expect-error params  type is expected to be right
        jsonSchema.maxLength = test.OPTIONS.params.length;
        break;
      case "min":
        // @ts-expect-error params  type is expected to be right
        jsonSchema.minLength = test.OPTIONS.params.min;
        break;
      case "max":
        // @ts-expect-error params  type is expected to be right
        jsonSchema.maxLength = test.OPTIONS.params.max;
        break;
      case "matches":
        // @ts-expect-error params  type is expected to be right
        jsonSchema.pattern = test.OPTIONS.params.regex?.toString().replace(/^\/(.*)\/[gimusy]*$/, '$1');
        break;
      case "email":
        jsonSchema.format = "email";
        break;
      case "url":
        jsonSchema.format = "uri";
        break;
      case "uuid":
        jsonSchema.format = 'uuid';
        jsonSchema.pattern = uuidRegExPattern;
        break;
    }
  });
  return jsonSchema;
};

export default stringConverter;
