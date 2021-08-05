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
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var createconnection_1 = require("./typeorm/createconnection");
var validation_schema_1 = require("./Joi/validation_schema");
var randomDate_1 = __importDefault(require("./Rdate/randomDate"));
var coupon_1 = require("./entity/coupon");
var store_1 = require("./entity/store");
var typeorm_1 = require("typeorm");
var app = express_1["default"]();
//GET
app.get('/coupons', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, _a, customer_email, code;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    _a = req.query, customer_email = _a.customer_email, code = _a.code;
                    if (!(typeof customer_email !== "string" || typeof code !== "string")) return [3 /*break*/, 1];
                    res.status(422).end();
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, repository.findOne({ customer_email: customer_email, code: code })];
                case 2:
                    if (_b.sent()) {
                        res.status(200).send(200);
                    }
                    ;
                    res.status(404).send(404);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
//POST
app.post('/coupons', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, newCoupon, code, validation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    newCoupon = new coupon_1.Coupon;
                    code = req.query.code;
                    return [4 /*yield*/, validation_schema_1.authSchema.validateAsync({ code: code })]; //preguntar como meter en el if
                case 1:
                    validation = _a.sent() //preguntar como meter en el if
                    ;
                    if (validation) {
                        newCoupon.code = code;
                        newCoupon.expiresAt = (randomDate_1["default"]);
                        repository.save(newCoupon);
                        res.status(201).send(201);
                    }
                    else {
                        res.status(422).send(422);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.patch('/coupons', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, newEmail, customer_email, emailValidate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(coupon_1.Coupon);
                    newEmail = new coupon_1.Coupon;
                    customer_email = req.query.customer_email;
                    return [4 /*yield*/, validation_schema_1.authEmail.validateAsync({ customer_email: customer_email })];
                case 1:
                    emailValidate = _a.sent();
                    if (!emailValidate) return [3 /*break*/, 4];
                    if (!(typeof customer_email == "string")) return [3 /*break*/, 3];
                    return [4 /*yield*/, repository.findOne({ customer_email: customer_email })];
                case 2:
                    if (_a.sent()) {
                        res.status(422).send(422);
                    }
                    else {
                    }
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    res.send({ message: 'error no valido' });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}, 
//DELETE
// app.delete('/coupons', async function (req,res) {
//     const repository = getRepository(Coupon);
//     const { code } = req.query;
//     if (typeof code !== "string") {
//         res.status(422).end()
//     } else {
//         const result = await repository.findOne({code})
//        if (result !== ) {
//            repository.remove(Coupon)
//        } 
//     }
// })
app.get('/stores', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(store_1.Store);
                    return [4 /*yield*/, repository.find().then(function (data) {
                            res.status(200).json({
                                data: data
                            });
                        })["catch"](function (err) {
                            res.status(400).json({
                                message: err
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}));
app.listen(3000);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createconnection_1.dbCreateConnection()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
