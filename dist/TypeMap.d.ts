import { JSONSchema7TypeName } from "json-schema";
import Converter from "./converters/Converter";
export declare type JSONSchemaTypeName = JSONSchema7TypeName | "mixed";
export declare type JsonSchemaType = {
    type: JSONSchemaTypeName | JSONSchemaTypeName[];
    converter: Converter;
};
export declare type Map = Record<string, JsonSchemaType>;
export default class TypeMap {
    private map;
    constructor(map: Map);
    getJsonSchemaType(yupType: string): JSONSchema7TypeName | JSONSchema7TypeName[];
    getConverter(yupType: string): Converter;
}
