"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mixed_1 = __importDefault(require("./mixed"));
//@ts-expect-error object is of type ObjectSchema
var objectConverter = function (object, typeMap) {
    var jsonSchema = {};
    var properties = {};
    var required = [];
    Object.keys(object.fields).forEach(function (fieldName) {
        var field = object.fields[fieldName];
        properties[fieldName] = mixed_1.default(field, typeMap);
        if (!field.tests.every(function (test) { return test.OPTIONS.name != "required"; })) {
            required.push(fieldName);
        }
    });
    if (Object.keys(properties).length > 0) {
        jsonSchema.properties = properties;
    }
    if (Object.keys(required).length > 0) {
        jsonSchema.required = required;
    }
    return jsonSchema;
};
exports.default = objectConverter;
