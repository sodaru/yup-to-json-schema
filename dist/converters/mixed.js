"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function metaHasDescription(meta) {
    return typeof meta === 'object' && meta != null && 'description' in meta;
}
var mixedConverter = function (mixed, typeMap) {
    var _a, _b;
    var jsonSchema = {};
    // type
    var yupType = mixed.type;
    jsonSchema.type = typeMap.getJsonSchemaType(yupType);
    var mixedDescription = mixed.describe();
    if (((_a = mixedDescription.oneOf) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        // @ts-expect-error oneof is assigned to enum
        jsonSchema.enum = mixedDescription.oneOf;
    }
    if (((_b = mixedDescription.notOneOf) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        jsonSchema.not = {
            // @ts-expect-error notoneof is assigned to enum
            enum: mixedDescription.notOneOf
        };
    }
    var meta = mixedDescription.meta;
    if (metaHasDescription(meta) && meta.description) {
        jsonSchema.description = meta.description;
    }
    /* @todo default is not supported yet
    const _default = mixed.getDefault();
    if (_default) {
      jsonSchema.default = _default;
    }
     */
    var converter = typeMap.getConverter(yupType);
    var typeSpecificSchema = converter(mixed, typeMap);
    jsonSchema = lodash_1.merge(jsonSchema, typeSpecificSchema);
    return jsonSchema;
};
exports.default = mixedConverter;
