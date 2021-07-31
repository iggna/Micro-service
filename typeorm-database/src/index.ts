import "reflect-metadata";
import express from "express";
import { application } from "express";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Coupon} from "./entity/coupon";
import {Store} from "./entity/store";

const app = express()

require('dotenv').config()

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "helterskelter",
    database: "rooftop-backend-challenge",
    entities: [
        Coupon,
        Store
    ],
    synchronize: true,
    logging: false
}).then(connection => {

    //Coupons
    app.get('/coupons', function (req, res) {
        console.log('accedio a coupons')
    })

    app.listen(3000)

}).catch(error => console.log(error));

