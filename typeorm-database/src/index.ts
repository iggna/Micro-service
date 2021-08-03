import "reflect-metadata";
import express, { response } from "express";
import "reflect-metadata";
import { dbCreateConnection } from "./typeorm/createconnection";
import { Coupon } from "./entity/coupon";
import { Store } from "./entity/store";
import { FindConditions, getRepository } from "typeorm";

const app = express()

app.get('/coupons', async function (req, res) {
    const repository = getRepository(Coupon);
    const { customer_email, code } = req.query;
    if (typeof customer_email !== "string" || typeof code !== "string") {
        res.status(422).end()
      } else {
        if (await repository.findOne({customer_email, code})) {
            res.status(200).send(200)
        };
            res.status(404).send(404)
      }
});

app.get('/stores', async function (req, res) {
    const repository = getRepository(Store);
    await repository.find().then((data) => {
        res.status(200).json({
            data:data,
        }); 
    }).catch((err)=> {
        res.status(400).json({
            message:err,
        });
    });
});


app.listen(3000);

(async () => {   
    await dbCreateConnection(); 
})();


