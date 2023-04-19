import { Converter, Meta } from "../types";
import commonConverter from "./common";

const booleanConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};
  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default booleanConverter;
