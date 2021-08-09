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
exports.__esModule = true;
exports.deleteStores = exports.postStores = exports.getStores = void 0;
var store_1 = require("../entity/store");
var typeorm_1 = require("typeorm");
var validation_schema_1 = require("../Joi/validation_schema");
var getStores = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, page, name, result, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(store_1.Store)];
                case 1:
                    repository = _a.sent();
                    page = Number(req.query.page);
                    name = req.query.name;
                    result = {
                        where: {},
                        take: 10,
                        skip: 0
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, validation_schema_1.authPage.validateAsync({ page: page })];
                case 3:
                    _a.sent();
                    if (page) {
                        result.skip = (page - 1) * result.take;
                    }
                    if (name) {
                        result.where.name = typeorm_1.Like("%" + name + "%");
                    }
                    return [4 /*yield*/, repository.findAndCount(result)];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, res.status(200).send(data)];
                case 5:
                    err_1 = _a.sent();
                    res.sendStatus(404).send({ message: err_1 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.getStores = getStores;
var postStores = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, address, repository, newStore, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.query.name;
                    address = req.query.address;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, validation_schema_1.auth.validateAsync({ name: name, address: address })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(store_1.Store)];
                case 3:
                    repository = _a.sent();
                    return [4 /*yield*/, repository.findOne({ name: name, address: address })];
                case 4:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [2 /*return*/, res.status(422).send({ message: 'there is already a store with that name/ address' })];
                case 5:
                    newStore = new store_1.Store;
                    newStore.name = name;
                    newStore.address = address;
                    return [4 /*yield*/, repository.save(newStore)];
                case 6:
                    _a.sent();
                    res.sendStatus(201);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    res.sendStatus(404).send({ message: err_2 });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.postStores = postStores;
var deleteStores = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, date, id, idResult, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(store_1.Store);
                    date = new Date();
                    id = Number(req.query.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, validation_schema_1.authId.validateAsync({ id: id })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, repository.findOneOrFail({ id: id })];
                case 3:
                    idResult = _a.sent();
                    if (!(idResult && idResult.deleted_at === null)) return [3 /*break*/, 5];
                    return [4 /*yield*/, repository.softDelete(id)];
                case 4:
                    _a.sent();
                    idResult.deleted_at = date;
                    res.sendStatus(201);
                    return [3 /*break*/, 6];
                case 5:
                    res.status(404).send({ message: 'already deleted' });
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _a.sent();
                    res.status(404).send({ message: 'there was an error, please try again', err: err_3 });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.deleteStores = deleteStores;
