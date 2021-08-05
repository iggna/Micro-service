"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authEmail = exports.authSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1["default"].object({
    code: joi_1["default"].string().alphanum().min(8).max(8)
});
exports.authEmail = joi_1["default"].object({
    email: joi_1["default"].string().email().required()
});
