import { merge } from "lodash";
import { Converter, Meta } from "../types";
import commonConverter from "./common"

const tupleConverter: Converter = (description, converters) => {
  const jsonSchema = commonConverter({
    ...description,
    type: "array"
  }, converters);
  const meta: Meta = description.meta || {};



  return merge(jsonSchema, meta.jsonSchema);
};

export default tupleConverter;
