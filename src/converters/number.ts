import { merge } from "lodash";
import { Converter, Meta } from "../types";
import commonConverter from "./common"

const numberConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  description.tests.forEach(test => {
    switch (test.name) {
      case "min":
        if (test.params?.min !== undefined) {
          jsonSchema.minimum = Number(test.params.min);
        }
        if (test.params?.more !== undefined) {
          jsonSchema.exclusiveMinimum = Number(test.params.more);
        }
        break;
      case "max":
        if (test.params?.max !== undefined) {
          jsonSchema.maximum = Number(test.params.max);
        }
        if (test.params?.less !== undefined) {
          jsonSchema.exclusiveMaximum = Number(test.params.less);
        }
        break;
      case "integer":
        jsonSchema.multipleOf = 1;
    }
  });

  return merge(jsonSchema, meta.jsonSchema);
};

export default numberConverter;
