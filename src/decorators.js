"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_TYPES = {};
exports.DEFAULT_PROPERTY_NAME = "type";
function JsonSubType(value) {
    return function (target) {
        target.prototype[exports.DEFAULT_PROPERTY_NAME] = value;
        exports.GLOBAL_TYPES[value] = target;
    };
}
exports.JsonSubType = JsonSubType;
//# sourceMappingURL=decorators.js.map