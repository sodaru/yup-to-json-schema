import { SchemaDescription } from "yup";
import { Converter, Converters, Meta } from "../types";
import commonConverter from "./common";

type TupleDescription = SchemaDescription & {
  innerType: [SchemaDescription, SchemaDescription];
};

// @ts-expect-error description is known
const tupleConverter: Converter = (
  description: TupleDescription,
  converters
) => {
  const jsonSchema = commonConverter(description, converters);
  const meta: Meta = description.meta || {};

  jsonSchema.type = "array";

  jsonSchema.items = description.innerType.map(description => {
    const converter = converters[description.type as keyof Converters];
    return converter(description, converters);
  });

  jsonSchema.minItems = jsonSchema.items.length;
  jsonSchema.maxItems = jsonSchema.items.length;

  return Object.assign(jsonSchema, meta.jsonSchema);
};

export default tupleConverter;
