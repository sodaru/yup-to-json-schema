import { JSONSchema7, JSONSchema7Type } from "json-schema";
import { SchemaDescription } from "yup";

export type YupType = "array" | "boolean" | "date" | "lazy" | "mixed" | "number" | "object" | "string" | "tuple";

export type Converters = Record<YupType, Converter>;

export type Converter = (
  description: SchemaDescription,
  converters: Converters
) => JSONSchema7;

export type Meta = {
  description?: string;
  example?: JSONSchema7Type;
  examples?: [JSONSchema7Type];
  jsonSchema?: JSONSchema7;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};