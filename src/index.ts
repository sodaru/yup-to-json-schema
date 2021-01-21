import { AnySchema } from "yup/lib/schema";
import { JSONSchema7 } from "json-schema";
import TypeMap, { Map } from "./TypeMap";
import stringConverter from "./converters/string";
import mixedConverter from "./converters/mixed";
import { merge } from "lodash";
import numberConverter from "./converters/number";
import booleanConverter from "./converters/boolean";
import dateConverter from "./converters/date";
import arrayConverter from "./converters/array";
import objectConverter from "./converters/object";

const yupToJsonSchema = (yupSchema: AnySchema, types?: Map): JSONSchema7 => {
  let _types: Map = {
    string: {
      type: "string",
      converter: stringConverter
    },
    number: {
      type: "number",
      converter: numberConverter
    },
    boolean: {
      type: "boolean",
      converter: booleanConverter
    },
    date: {
      type: "string",
      converter: dateConverter
    },
    array: {
      type: "array",
      converter: arrayConverter
    },
    object: {
      type: "object",
      converter: objectConverter
    }
  };

  if (types) {
    _types = merge(_types, types);
  }

  const typeMap = new TypeMap(_types);

  return mixedConverter(yupSchema, typeMap);
};

export default yupToJsonSchema;
