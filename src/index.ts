import { AnySchema } from "yup";
import { JSONSchema7 } from "json-schema";
import { Converters } from "./types";
import stringConverter from "./converters/string";
import numberConverter from "./converters/number";
import booleanConverter from "./converters/boolean";
import dateConverter from "./converters/date";
import arrayConverter from "./converters/array";
import objectConverter from "./converters/object";
import tupleConverter from "./converters/tuple";
import mixedConverter from "./converters/mixed";
import lazyConverter from "./converters/lazy";

// This is basically Yup's ResolveOptions type
// that yup doesn't actually export with.
// `converters` added.
type Options = {
  value?: unknown;
  parent?: unknown;
  context?: unknown;
  converters?: Converters
};

const yupToJsonSchema = (
  yupSchema: AnySchema,
  options: Options
): JSONSchema7 => {

  const { converters: overrides, ...resolveOptions } = options;

  const converters: Converters = {
    string: stringConverter,
    number: numberConverter,
    boolean: booleanConverter,
    date: dateConverter,
    array: arrayConverter,
    object: objectConverter,
    tuple: tupleConverter,
    mixed: mixedConverter,
    lazy: lazyConverter,
    ...overrides
  }

  const description = yupSchema.describe(resolveOptions);
  const converter = converters[description.type as keyof Converters]

  return converter(description, converters);
};

export default yupToJsonSchema;
