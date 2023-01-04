import { JSONSchema7TypeName } from "json-schema";
import Converter from "./converters/Converter";

export type JSONSchemaTypeName = JSONSchema7TypeName | "mixed";
export type JsonSchemaType = {
  type: JSONSchemaTypeName | JSONSchemaTypeName[];
  converter: Converter;
};

export type Map = Record<string, JsonSchemaType>;

export default class TypeMap {
  private map: Map;
  constructor(map: Map) {
    this.map = map;
  }

  getJsonSchemaType(
    yupType: string
  ): JSONSchema7TypeName | JSONSchema7TypeName[] {
    // We can't write a type-predicate against a union type of JSONSchema7TypeName
    // We have to rely on manual type-casting here
    if (this.map[yupType] && this.map[yupType].type !== "mixed") {
      return this.map[yupType].type as
        | JSONSchema7TypeName
        | JSONSchema7TypeName[];
    }
    throw new Error(`unknown type ${yupType}`);
  }

  getConverter(yupType: string): Converter {
    if (this.map[yupType]) {
      return this.map[yupType].converter;
    }
    throw new Error(`unknown type ${yupType}`);
  }
}
