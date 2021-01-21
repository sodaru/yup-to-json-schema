"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numberConverter = function (number) {
    var jsonSchema = {};
    number.tests.forEach(function (test) {
        var _a, _b, _c, _d;
        switch (test.OPTIONS.name) {
            case "min":
                if (((_a = test.OPTIONS.params) === null || _a === void 0 ? void 0 : _a.min) !== undefined) {
                    //@ts-expect-error test.OPTIONS.params.min will be present
                    jsonSchema.minimum = test.OPTIONS.params.min;
                }
                if (((_b = test.OPTIONS.params) === null || _b === void 0 ? void 0 : _b.more) !== undefined) {
                    //@ts-expect-error test.OPTIONS.params.more will be present
                    jsonSchema.exclusiveMinimum = test.OPTIONS.params.more;
                }
                break;
            case "max":
                if (((_c = test.OPTIONS.params) === null || _c === void 0 ? void 0 : _c.max) !== undefined) {
                    //@ts-expect-error test.OPTIONS.params.max will be present
                    jsonSchema.maximum = test.OPTIONS.params.max;
                }
                if (((_d = test.OPTIONS.params) === null || _d === void 0 ? void 0 : _d.less) !== undefined) {
                    //@ts-expect-error test.OPTIONS.params.less will be present
                    jsonSchema.exclusiveMaximum = test.OPTIONS.params.less;
                }
                break;
            case "integer":
                jsonSchema.multipleOf = 1;
        }
    });
    return jsonSchema;
};
exports.default = numberConverter;
