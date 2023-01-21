import { JSONSchema7 } from "json-schema";
import { SchemaDescription } from "yup";
import { Converter } from "../TypeMap";

type ObjectDescription = SchemaDescription & {
  fields: { [key: string]: SchemaDescription };
};

// @ts-expect-error fields is expected type
const objectConverter: Converter = (
  description: ObjectDescription,
  typeMap
) => {
  const jsonSchema: JSONSchema7 = {};
  const properties: Record<string, JSONSchema7> = {};
  const required: string[] = [];

  Object.keys(description.fields).forEach(fieldName => {
    const fieldDescription = description.fields[fieldName];
    const converter = typeMap.getConverter(fieldDescription.type);
    properties[fieldName] = converter(fieldDescription, typeMap);
    if (!fieldDescription.optional) {
      required.push(fieldName);
    }
  });

  if (Object.keys(properties).length > 0) {
    jsonSchema.properties = properties;
  }

  if (Object.keys(required).length > 0) {
    jsonSchema.required = required;
  }

  return jsonSchema;
};

export default objectConverter;
