import { JSONSchema7 } from "json-schema";
import { Converter } from "../TypeMap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dateConverter: Converter = description => {
  const jsonSchema: JSONSchema7 = { format: "date-time" };
  return jsonSchema;
};

export default dateConverter;
