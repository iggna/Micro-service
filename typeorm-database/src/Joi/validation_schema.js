"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authAddress = exports.authName = exports.authPage = exports.authEmail = exports.authSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1["default"].object({
    code: joi_1["default"].string().alphanum().equal(8)
});
exports.authEmail = joi_1["default"].object({
    customer_email: joi_1["default"].string().email().required()
});
exports.authPage = joi_1["default"].object({
    page: joi_1["default"].number().required()
});
exports.authName = joi_1["default"].object({
    name: joi_1["default"].string().required()
});
exports.authAddress = joi_1["default"].object({
    address: joi_1["default"].string().required()
});
//preguntar si se pueden hacer menos validaciones
