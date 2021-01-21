import { JSONSchema7TypeName } from "json-schema";
import Converter from "./converters/Converter";

export type JsonSchemaType = {
  type: JSONSchema7TypeName | JSONSchema7TypeName[];
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
    if (this.map[yupType]) {
      return this.map[yupType].type;
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
