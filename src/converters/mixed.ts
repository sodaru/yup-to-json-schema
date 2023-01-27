import { merge } from "lodash";
import { Converter, Meta } from "../types";
import commonConverter from "./common"

const mixedConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};
  return merge(jsonSchema, meta.jsonSchema);
};

export default mixedConverter;
