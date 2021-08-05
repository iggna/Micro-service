import "reflect-metadata";
import express, { Response, Request } from "express";
import { dbCreateConnection } from "./typeorm/createConnection";
import { getCoupons, patchCoupons, postCoupons, deleteCoupons } from "./controllers/coupon.controller";

const app = express()
app.use(express.json());

//GET
app.get('/coupons', getCoupons)

//POST
app.post('/coupons', postCoupons)

//PATCH
app.patch('/coupons', patchCoupons) 

//DELETE
app.delete('/coupons', deleteCoupons)


app.listen(3000);

(async () => {   
    await dbCreateConnection(); 
})();
