import { JSONSchema7 } from "json-schema";
import Converter from "./Converter";

const dateConverter: Converter = () => {
  const jsonSchema: JSONSchema7 = { format: "date-time" };
  return jsonSchema;
};

export default dateConverter;
