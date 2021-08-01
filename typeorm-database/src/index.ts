import "reflect-metadata";
import express from "express";
import "reflect-metadata";
import { dbCreateConnection } from "./typeorm/createconnection";
import { Coupon } from "./entity/coupon";
import { getRepository } from "typeorm";

const app = express()

app.get('/coupons', async function (req, res) {
    const repository = getRepository(Coupon);
    const data = await repository.find();
    console.log(data)
    res.send(data)
})

app.listen(3000);

(async () => {   
    await dbCreateConnection(); 
})();

