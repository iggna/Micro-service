"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteCoupons = exports.patchCoupons = exports.postCoupons = exports.getCoupons = void 0;
var validation_schema_1 = require("../Joi/validation_schema");
var randomDate_1 = __importDefault(require("../Rdate/randomDate"));
var coupon_1 = require("../entity/coupon");
var typeorm_1 = require("typeorm");
var getCoupons = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, code, customer_email, coupon, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    code = req.query.code;
                    customer_email = req.query.customer_email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repository.findOneOrFail({ code: code, customer_email: customer_email })];
                case 2:
                    coupon = _a.sent();
                    if (coupon !== undefined && coupon.deleted_at == undefined) {
                        if (coupon.customer_email === customer_email && coupon.code === code) {
                            res.sendStatus(200);
                        }
                    }
                    else {
                        res.status(404).send({ message: 'this coupon is already deleted' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(404).send({ message: 'email or coupon not found/ not matching' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getCoupons = getCoupons;
var postCoupons = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, repository, coupon, newCoupon, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = req.query.code;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, validation_schema_1.authSchema.validateAsync({ code: code })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(coupon_1.Coupon)];
                case 3:
                    repository = _a.sent();
                    return [4 /*yield*/, repository.findOne({ code: code })];
                case 4:
                    coupon = _a.sent();
                    if (!(coupon !== undefined && code === coupon.code)) return [3 /*break*/, 5];
                    return [2 /*return*/, res.status(422).json({ message: 'there is already a coupon created with that code' })];
                case 5:
                    newCoupon = new coupon_1.Coupon();
                    newCoupon.code = code;
                    newCoupon.expiresAt = (randomDate_1["default"]);
                    return [4 /*yield*/, repository.save(newCoupon)];
                case 6:
                    _a.sent();
                    res.sendStatus(201);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    res.sendStatus(422).send({ message: err_2 });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.postCoupons = postCoupons;
var patchCoupons = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, customer_email, date, email, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    customer_email = req.query.customer_email;
                    date = new Date();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, validation_schema_1.authEmail.validateAsync({ customer_email: customer_email })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, repository.findOne({ customer_email: customer_email })];
                case 3:
                    email = _a.sent();
                    if (!(email && email.code !== null)) return [3 /*break*/, 4];
                    return [2 /*return*/, res.status(422).send({ message: 'there is already a coupon asigned to that email' })];
                case 4: return [4 /*yield*/, repository.findOneOrFail({ where: { customer_email: null } })];
                case 5:
                    result = _a.sent();
                    result.customer_email = customer_email;
                    result.assignedAt = date;
                    repository.save(result);
                    res.sendStatus(201);
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _a.sent();
                    res.sendStatus(422).send({ message: err_3 });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.patchCoupons = patchCoupons;
var deleteCoupons = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, date, id, idResult, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    date = new Date();
                    id = Number(req.query.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, repository.findOneOrFail({ id: id })];
                case 2:
                    idResult = _a.sent();
                    if (!(idResult.customer_email === null && idResult.deleted_at == null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, repository.softDelete(id)];
                case 3:
                    _a.sent();
                    idResult.deleted_at = date;
                    res.sendStatus(201);
                    return [3 /*break*/, 5];
                case 4:
                    res.status(404).send({ message: 'The coupon requested has an email assigned already' });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    res.status(404).send({ message: 'there was an error, please try again', err: err_4 });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.deleteCoupons = deleteCoupons;
