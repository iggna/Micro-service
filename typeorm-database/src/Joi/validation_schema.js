"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var authSchema = joi_1["default"].object({
    code: joi_1["default"].string().alphanum().min(8).max(8)
});
exports["default"] = authSchema;
