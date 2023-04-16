import { AnySchema } from "yup";
import { JSONSchema7 } from "json-schema";
import { Converters, ResolveOptions } from "../types";
import stringConverter from "./string";
import numberConverter from "./number";
import booleanConverter from "./boolean";
import dateConverter from "./date";
import arrayConverter from "./array";
import objectConverter from "./object";
import tupleConverter from "./tuple";
import mixedConverter from "./mixed";
import lazyConverter from "./lazy";

export function convertSchema(
  yupSchema: AnySchema,
  options?: ResolveOptions
): JSONSchema7 {
  const { converters, ...resolveOptions } = options || {};

  const allConverters: Converters = {
    string: stringConverter,
    number: numberConverter,
    boolean: booleanConverter,
    date: dateConverter,
    array: arrayConverter,
    object: objectConverter,
    tuple: tupleConverter,
    mixed: mixedConverter,
    lazy: lazyConverter,
    ...converters
  };

  const description = yupSchema.describe(resolveOptions);
  const converter = allConverters[description.type as keyof Converters];

  return converter(description, allConverters);
}
