import { JSONSchema7 } from "json-schema";
import Converter from "./Converter";
import commonMetadata from './commonMetadata'

const booleanConverter: Converter = boolean => {
  const jsonSchema: JSONSchema7 = {};
  commonMetadata(boolean, jsonSchema);
  return jsonSchema;
};

export default booleanConverter;
