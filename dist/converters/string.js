"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidRegExPattern = "/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i";
var stringConverter = function (string) {
    var jsonSchema = {};
    string.tests.forEach(function (test) {
        var _a;
        switch (test.OPTIONS.name) {
            case "length":
                // @ts-expect-error params  type is expected to be right
                jsonSchema.minLength = test.OPTIONS.params.length;
                // @ts-expect-error params  type is expected to be right
                jsonSchema.maxLength = test.OPTIONS.params.length;
                break;
            case "min":
                // @ts-expect-error params  type is expected to be right
                jsonSchema.minLength = test.OPTIONS.params.min;
                break;
            case "max":
                // @ts-expect-error params  type is expected to be right
                jsonSchema.maxLength = test.OPTIONS.params.max;
                break;
            case "matches":
                // @ts-expect-error params  type is expected to be right
                jsonSchema.pattern = (_a = test.OPTIONS.params.regex) === null || _a === void 0 ? void 0 : _a.toString();
                break;
            case "email":
                jsonSchema.format = "email";
                break;
            case "url":
                jsonSchema.format = "uri";
                break;
            case "uuid":
                jsonSchema.pattern = uuidRegExPattern;
                break;
        }
    });
    return jsonSchema;
};
exports.default = stringConverter;
