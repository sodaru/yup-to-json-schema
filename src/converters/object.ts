import { JSONSchema7 } from "json-schema";
import ObjectSchema from "yup/lib/object";
import { AnySchema } from "yup/lib/schema";
import Converter from "./Converter";
import mixedConverter from "./mixed";
import commonMetadata from './commonMetadata'

//@ts-expect-error object is of type ObjectSchema
const objectConverter: Converter = (
  object: ObjectSchema<Record<string, AnySchema>>,
  typeMap
) => {
  const jsonSchema: JSONSchema7 = {};
  const properties: Record<string, JSONSchema7> = {};
  const required: string[] = [];
  Object.keys(object.fields).forEach(fieldName => {
    const field = object.fields[fieldName];
    properties[fieldName] = mixedConverter(field, typeMap);
    if (!field.tests.every(test => test.OPTIONS.name != "required")) {
      required.push(fieldName);
    }
  });
  if (Object.keys(properties).length > 0) {
    jsonSchema.properties = properties;
  }
  if (Object.keys(required).length > 0) {
    jsonSchema.required = required;
  }

  commonMetadata(object, jsonSchema);
  return jsonSchema;
};

export default objectConverter;
