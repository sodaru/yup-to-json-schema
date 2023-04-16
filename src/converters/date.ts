import { Converter, Meta } from "../types";
import commonConverter from "./common";

const dateConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  jsonSchema.type = "string";
  jsonSchema.format = "date-time";

  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default dateConverter;
