import { JSONSchema7 as Schema } from "json-schema";
import { AnySchema } from "yup/lib/schema";
import TypeMap from "../TypeMap";
declare type Converter = (schema: AnySchema, typeMap: TypeMap) => Schema;
export default Converter;
