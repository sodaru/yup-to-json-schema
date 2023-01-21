import { JSONSchema7 } from "json-schema";
import { Converter } from "../TypeMap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const booleanConverter: Converter = description => {
  const jsonSchema: JSONSchema7 = {};
  return jsonSchema;
};

export default booleanConverter;
