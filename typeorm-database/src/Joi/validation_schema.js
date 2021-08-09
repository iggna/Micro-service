"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.auth = exports.authId = exports.authPage = exports.authEmail = exports.authSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1["default"].object({
    code: joi_1["default"].string().alphanum().min(8).max(8).required()
});
exports.authEmail = joi_1["default"].object({
    customer_email: joi_1["default"].string().email().required()
});
exports.authPage = joi_1["default"].object({
    page: joi_1["default"].number()
});
exports.authId = joi_1["default"].object({
    id: joi_1["default"].number().required()
});
exports.auth = joi_1["default"].object({
    name: joi_1["default"].string().required(),
    address: joi_1["default"].string().required()
});
