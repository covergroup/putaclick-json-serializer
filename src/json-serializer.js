"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var JsonSerializer = /** @class */ (function () {
    function JsonSerializer() {
    }
    JsonSerializer.prototype.deserialize = function (json, constructorFn) {
        var jsonObject = JSON.parse(json);
        return this.deserializeObject(jsonObject, constructorFn);
    };
    JsonSerializer.prototype.serialize = function (object) {
        var json = JSON.parse(JSON.stringify(object));
        json[decorators_1.DEFAULT_PROPERTY_NAME] = object[decorators_1.DEFAULT_PROPERTY_NAME];
        return JSON.stringify(json);
    };
    JsonSerializer.prototype.deserializeArray = function (jsonObject) {
        var _this = this;
        var array = jsonObject;
        return array.map(function (element) {
            return _this.deserializeObject(element);
        });
    };
    JsonSerializer.prototype.deserializeObject = function (jsonObject, constructorFn, objectValue) {
        var _this = this;
        var result = null;
        if (decorators_1.GLOBAL_TYPES[jsonObject[decorators_1.DEFAULT_PROPERTY_NAME]]) {
            result = new decorators_1.GLOBAL_TYPES[jsonObject[decorators_1.DEFAULT_PROPERTY_NAME]]();
        }
        else if (constructorFn) {
            result = new constructorFn();
        }
        else if (objectValue) {
            result = objectValue;
        }
        else {
            console.error("cannot determine object type, default Object type will be used at your own risk.  " +
                "Maybe you can instantiate the property using this object: " +
                JSON.stringify(jsonObject));
            result = Object.create({});
        }
        Object.getOwnPropertyNames(jsonObject).map(function (property) {
            if (jsonObject[property] instanceof Array) {
                result[property] = _this.deserializeArray(jsonObject[property]);
            }
            else if (jsonObject[property] instanceof Object) {
                result[property] = _this.deserializeObject(jsonObject[property], (constructorFn = undefined), (objectValue = result[property]));
            }
            else {
                result[property] = jsonObject[property];
            }
        });
        return result;
    };
    return JsonSerializer;
}());
exports.JsonSerializer = JsonSerializer;
//# sourceMappingURL=json-serializer.js.map