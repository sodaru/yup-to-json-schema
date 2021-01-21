"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixed_1 = __importDefault(require("./mixed"));
// @ts-expect-error array is of type ArraySchema
var arrayConverter = function (array, typeMap) {
    var jsonSchema = {};
    if (array.innerType) {
        jsonSchema.items = mixed_1.default(array.innerType, typeMap);
    }
    array.tests.forEach(function (test) {
        switch (test.OPTIONS.name) {
            case "length":
                // @ts-expect-error test.OPTIONS.params.length will be present
                jsonSchema.minItems = jsonSchema.maxItems = test.OPTIONS.params.length;
                break;
            case "min":
                // @ts-expect-error test.OPTIONS.params.min will be present
                jsonSchema.minItems = test.OPTIONS.params.min;
                break;
            case "max":
                // @ts-expect-error test.OPTIONS.params.max will be present
                jsonSchema.maxItems = test.OPTIONS.params.max;
                break;
        }
    });
    return jsonSchema;
};
exports.default = arrayConverter;
