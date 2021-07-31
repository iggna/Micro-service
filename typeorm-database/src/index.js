"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var coupon_1 = require("./entity/coupon");
var store_1 = require("./entity/store");
var app = express_1["default"]();
require('dotenv').config();
typeorm_1.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "helterskelter",
    database: "rooftop-backend-challenge",
    entities: [
        coupon_1.Coupon,
        store_1.Store
    ],
    synchronize: true,
    logging: false
}).then(function (connection) {
    //Coupons
    app.get('/stores', function (req, res) {
        res.json(store_1.Store);
        console.log('accedio a store');
    });
    app.listen(3000);
})["catch"](function (error) { return console.log(error); });
