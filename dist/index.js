"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TypeMap_1 = __importDefault(require("./TypeMap"));
var string_1 = __importDefault(require("./converters/string"));
var mixed_1 = __importDefault(require("./converters/mixed"));
var lodash_1 = require("lodash");
var number_1 = __importDefault(require("./converters/number"));
var boolean_1 = __importDefault(require("./converters/boolean"));
var date_1 = __importDefault(require("./converters/date"));
var array_1 = __importDefault(require("./converters/array"));
var object_1 = __importDefault(require("./converters/object"));
var yupToJsonSchema = function (yupSchema, types) {
    var _types = {
        string: {
            type: "string",
            converter: string_1.default
        },
        number: {
            type: "number",
            converter: number_1.default
        },
        boolean: {
            type: "boolean",
            converter: boolean_1.default
        },
        date: {
            type: "string",
            converter: date_1.default
        },
        array: {
            type: "array",
            converter: array_1.default
        },
        object: {
            type: "object",
            converter: object_1.default
        },
        mixed: {
            type: "mixed",
            converter: mixed_1.default
        }
    };
    if (types) {
        _types = lodash_1.merge(_types, types);
    }
    var typeMap = new TypeMap_1.default(_types);
    var baseConverter = typeMap.getConverter("mixed");
    return baseConverter(yupSchema, typeMap);
};
exports.default = yupToJsonSchema;
