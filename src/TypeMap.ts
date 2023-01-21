import {
  JSONSchema7 as Schema,
  JSONSchema7TypeName,
  JSONSchema7Type
} from "json-schema";
import { AnySchema, SchemaDescription } from "yup";
import { merge } from "lodash";

export type JSONSchemaTypeName = JSONSchema7TypeName | "mixed";
export type JsonSchemaType = {
  type: JSONSchemaTypeName | JSONSchemaTypeName[];
  converter: Converter;
};

export type Map = Record<string, JsonSchemaType>;

export type Converter = (
  description: SchemaDescription,
  typeMap: TypeMap
) => Schema;

export type Meta = {
  description?: string;
  example?: JSONSchema7Type;
  examples?: [JSONSchema7Type];
  jsonSchema?: Schema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default class TypeMap {
  private map: Map;
  constructor(map: Map) {
    this.map = map;
  }

  getJsonSchemaType(yupType: string): JSONSchema7TypeName {
    if (this.map[yupType] && this.map[yupType].type !== "mixed") {
      return this.map[yupType].type as JSONSchema7TypeName;
    }
    throw new Error(`Unknown type ${yupType}`);
  }

  getConverter(yupType: string): Converter {
    if (this.map[yupType]) {
      return this.map[yupType].converter;
    }
    throw new Error(`Unknown type ${yupType}`);
  }

  convert(yupSchema: AnySchema): Schema {
    const jsonSchema: Schema = {};
    const description = yupSchema.describe();
    const defaultValue = yupSchema.getDefault();
    const meta: Meta = description.meta || {};

    const jsonSchemaType = this.getJsonSchemaType(description.type);

    jsonSchema.type = jsonSchemaType;

    if (description.nullable) {
      jsonSchema.type = [jsonSchemaType, "null"];
    }

    if (description.oneOf?.length > 0) {
      jsonSchema.enum = description.oneOf as JSONSchema7Type[];
    }

    if (description.notOneOf?.length > 0) {
      jsonSchema.not = {
        enum: description.notOneOf as JSONSchema7Type[]
      };
    }

    if (description.label) {
      jsonSchema.description = description.label;
    }

    if (defaultValue !== undefined) {
      jsonSchema.default = defaultValue;
    }

    if (meta.description) {
      jsonSchema.description = meta.description;
    }

    if (meta.example) {
      jsonSchema.examples = [meta.example];
    }

    if (meta.examples) {
      jsonSchema.examples = meta.examples;
    }

    const converter = this.getConverter(description.type);
    const typeSchema = converter(description, this);

    return merge(jsonSchema, typeSchema, meta.jsonSchema);
  }
}
