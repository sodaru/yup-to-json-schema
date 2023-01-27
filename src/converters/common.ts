import { JSONSchema7, JSONSchema7Type, JSONSchema7TypeName } from "json-schema";
import { merge } from "lodash";
import { Converter, Meta } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonConverter: Converter = (description, converters) => {
  const jsonSchema: JSONSchema7 = {};
  const meta: Meta = description.meta || {};

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
    jsonSchema.description = description.label;
  }

  // @ts-expect-error default is on description in latest Yup pre
  if (description.default !== undefined) {
    // @ts-expect-error default is on description in latest Yup pre
    jsonSchema.default = description.default;
  }

  if (meta.description) {
    jsonSchema.description = meta.description;
  }

  if (meta.example) {
    jsonSchema.examples = [meta.example];
  }

  if (meta.examples) {
    jsonSchema.examples = meta.examples;
  }

  return merge(jsonSchema, meta.jsonSchema);
};

export default commonConverter;

