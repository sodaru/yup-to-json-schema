import { JSONSchema7 } from "json-schema";
import ArraySchema from "yup/lib/array";
import { AnySchema } from "yup/lib/schema";
import Converter from "./Converter";
import mixedConverter from "./mixed";

// @ts-expect-error array is of type ArraySchema
const arrayConverter: Converter = (array: ArraySchema<AnySchema>, typeMap) => {
  const jsonSchema: JSONSchema7 = {};

  if (array.innerType) {
    jsonSchema.items = mixedConverter(array.innerType, typeMap);
  }

  array.tests.forEach(test => {
    switch (test.OPTIONS.name) {
      case "length":
        // @ts-expect-error test.OPTIONS.params.length will be present
        jsonSchema.minItems = jsonSchema.maxItems = test.OPTIONS.params.length;
        break;
      case "min":
        // @ts-expect-error test.OPTIONS.params.min will be present
        jsonSchema.minItems = test.OPTIONS.params.min;
        break;
      case "max":
        // @ts-expect-error test.OPTIONS.params.max will be present
        jsonSchema.maxItems = test.OPTIONS.params.max;
        break;
    }
  });
  return jsonSchema;
};

export default arrayConverter;
