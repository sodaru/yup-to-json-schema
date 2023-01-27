import { merge } from "lodash";
import { Converter, Meta } from "../types";
import commonConverter from "./common"

const dateConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  jsonSchema.format = "date-time";

  return merge(jsonSchema, meta.jsonSchema);
};

export default dateConverter;
