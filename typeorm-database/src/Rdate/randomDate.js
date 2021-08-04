"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var date_1 = __importDefault(require("@js-random/date"));
var date = date_1["default"]();
var Rdate = date_1["default"]({
    from: new Date(2021, 8, 8),
    to: new Date(2025, 8, 8)
});
exports["default"] = Rdate;
