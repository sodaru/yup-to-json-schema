import { JSONSchema7, JSONSchema7Type, JSONSchema7TypeName } from "json-schema";
import { Converter } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonConverter: Converter = (description, converters) => {
  const jsonSchema: JSONSchema7 = {};

  jsonSchema.type = description.type as JSONSchema7TypeName;

  if (description.nullable) {
    jsonSchema.type = [jsonSchema.type, "null"];
  }

  if (description.oneOf?.length > 0) {
    jsonSchema.enum = description.oneOf as JSONSchema7Type[];
  }

  if (description.notOneOf?.length > 0) {
    jsonSchema.not = {
      enum: description.notOneOf as JSONSchema7Type[]
    };
  }

  if (description.label) {
    jsonSchema.title = description.label;
  }

  if (description.default !== undefined) {
    // @ts-expect-error default is unknown
    jsonSchema.default = description.default;
  }

  return jsonSchema;
};

export default commonConverter;
