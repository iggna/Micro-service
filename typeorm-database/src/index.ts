import "reflect-metadata";
import express, { response } from "express";
import "reflect-metadata";
import { dbCreateConnection } from "./typeorm/createconnection";
import {authSchema, authEmail} from "./Joi/validation_schema";
import Rdate from "./Rdate/randomDate";
import { Coupon } from "./entity/coupon";
import { Store } from "./entity/store";
import { FindConditions, getRepository, Equal } from "typeorm";

const app = express()

//GET
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

//POST
app.post('/coupons', async function (req, res) {
    const repository = getRepository(Coupon);
    const newCoupon = new Coupon;
    const code :string = (req.query.code as string) ;
    const validation = await authSchema.validateAsync({code}) //preguntar como meter en el if
    if(validation) {
        newCoupon.code = code
        newCoupon.expiresAt = (Rdate)
        repository.save(newCoupon)
        res.status(201).send(201)
    } else {
        res.status(422).send(422)
    }
})

app.patch('/coupons', async function (req, res) {
    const repository = getRepository(Coupon);
    const newEmail = new Coupon
    const { customer_email } = req.query;
    const emailValidate = await authEmail.validateAsync({customer_email})
    if (emailValidate) {
        //validar que no haya generado otro cupon previamente

        if (typeof customer_email == "string") {
            if (await repository.findOne({customer_email})) {
                res.status(422).send(422)
            } else {
                
            }
        }
    } else {
        res.send({message: 'email not valid'})
    }
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


//STORES

//GET
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
}));


app.listen(3000);

(async () => {   
    await dbCreateConnection(); 
})();


