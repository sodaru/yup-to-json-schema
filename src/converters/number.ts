import { JSONSchema7 } from "json-schema";
import Converter from "./Converter";

const numberConverter: Converter = number => {
  const jsonSchema: JSONSchema7 = {};
  number.tests.forEach(test => {
    switch (test.OPTIONS.name) {
      case "min":
        if (test.OPTIONS.params?.min !== undefined) {
          //@ts-expect-error test.OPTIONS.params.min will be present
          jsonSchema.minimum = test.OPTIONS.params.min;
        }
        if (test.OPTIONS.params?.more !== undefined) {
          //@ts-expect-error test.OPTIONS.params.more will be present
          jsonSchema.exclusiveMinimum = test.OPTIONS.params.more;
        }
        break;
      case "max":
        if (test.OPTIONS.params?.max !== undefined) {
          //@ts-expect-error test.OPTIONS.params.max will be present
          jsonSchema.maximum = test.OPTIONS.params.max;
        }
        if (test.OPTIONS.params?.less !== undefined) {
          //@ts-expect-error test.OPTIONS.params.less will be present
          jsonSchema.exclusiveMaximum = test.OPTIONS.params.less;
        }
        break;
      case "integer":
        jsonSchema.multipleOf = 1;
    }
  });
  return jsonSchema;
};

export default numberConverter;
