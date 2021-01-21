import { AnySchema } from "yup/lib/schema";
import { JSONSchema7 } from "json-schema";
declare const yupToJsonSchema: (yupSchema: AnySchema, types?: Record<string, import("./TypeMap").JsonSchemaType> | undefined) => JSONSchema7;
export default yupToJsonSchema;
