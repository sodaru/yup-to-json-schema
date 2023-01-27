import { JSONSchema7 } from "json-schema";
import { merge } from "lodash";
import { SchemaDescription } from "yup";
import { Converter, Converters, Meta } from "../types";
import commonConverter from "./common"

type ObjectDescription = SchemaDescription & {
  fields: { [key: string]: SchemaDescription };
};


const objectConverter: Converter = (
  description: ObjectDescription,
  converters
) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};
  const properties: Record<string, JSONSchema7> = {};
  const required: string[] = [];

  Object.keys(description.fields).forEach(fieldName => {
    const fieldDescription = description.fields[fieldName];
    const converter = converters[fieldDescription.type as keyof Converters];
    properties[fieldName] = converter(fieldDescription, converters);
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

  return merge(jsonSchema, meta.jsonSchema);
};

export default objectConverter;
