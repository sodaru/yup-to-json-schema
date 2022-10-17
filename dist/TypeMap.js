"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeMap = /** @class */ (function () {
    function TypeMap(map) {
        this.map = map;
    }
    TypeMap.prototype.getJsonSchemaType = function (yupType) {
        // We can't write a type-predicate against a union type of JSONSchema7TypeName
        // We have to rely on manual type-casting here
        if (this.map[yupType] && this.map[yupType].type !== "mixed") {
            return this.map[yupType].type;
        }
        throw new Error("unknown type " + yupType);
    };
    TypeMap.prototype.getConverter = function (yupType) {
        if (this.map[yupType]) {
            return this.map[yupType].converter;
        }
        throw new Error("unknown type " + yupType);
    };
    return TypeMap;
}());
exports.default = TypeMap;
