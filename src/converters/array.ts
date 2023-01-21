import { JSONSchema7 } from "json-schema";
import { Converter } from "../TypeMap";
import { SchemaDescription } from "yup";

type ArrayDescription = SchemaDescription & { innerType?: SchemaDescription };

const arrayConverter: Converter = (description: ArrayDescription, typeMap) => {
  const jsonSchema: JSONSchema7 = {};

  if (description.innerType) {
    const converter = typeMap.getConverter(description.innerType.type);
    jsonSchema.items = converter(description.innerType, typeMap);
  }

  description.tests.forEach(test => {
    switch (test.name) {
      case "length":
        if (test.params?.length !== undefined) {
          jsonSchema.minItems = jsonSchema.maxItems = Number(
            test.params.length
          );
        }
        break;
      case "min":
        if (test.params?.min !== undefined) {
          jsonSchema.minItems = Number(test.params.min);
        }
        break;
      case "max":
        if (test.params?.max !== undefined) {
          jsonSchema.maxItems = Number(test.params.max);
        }
        break;
    }
  });

  return jsonSchema;
};

export default arrayConverter;
