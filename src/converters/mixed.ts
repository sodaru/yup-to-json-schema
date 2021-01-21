import { JSONSchema7 as Schema } from "json-schema";
import Converter from "./Converter";
import { merge } from "lodash";

const mixedConverter: Converter = (mixed, typeMap) => {
  let jsonSchema: Schema = {};
  // type
  const yupType = mixed.type;
  jsonSchema.type = typeMap.getJsonSchemaType(yupType);

  const mixedDescription = mixed.describe();

  if (mixedDescription.oneOf?.length > 0) {
    // @ts-expect-error oneof is assigned to enum
    jsonSchema.enum = mixedDescription.oneOf;
  }

  if (mixedDescription.notOneOf?.length > 0) {
    jsonSchema.not = {
      // @ts-expect-error notoneof is assigned to enum
      enum: mixedDescription.notOneOf
    };
  }

  /* @todo default is not supported yet 
  const _default = mixed.getDefault();
  if (_default) {
    jsonSchema.default = _default;
  }
   */

  const converter = typeMap.getConverter(yupType);
  const typeSpecificSchema = converter(mixed, typeMap);

  jsonSchema = merge(jsonSchema, typeSpecificSchema);
  return jsonSchema;
};

export default mixedConverter;
