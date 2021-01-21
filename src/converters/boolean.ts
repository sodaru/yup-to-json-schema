import { JSONSchema7 } from "json-schema";
import Converter from "./Converter";

const booleanConverter: Converter = () => {
  const jsonSchema: JSONSchema7 = {};
  return jsonSchema;
};

export default booleanConverter;
