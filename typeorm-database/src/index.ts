import "reflect-metadata";
import express, { Response, Request } from "express";
import { dbCreateConnection } from "./typeorm/createConnection";
import { getCoupons, patchCoupons, postCoupons, deleteCoupons } from "./controllers/coupons.controller";
import { deleteStores, getStores, postStores,  } from "./controllers/stores.controller";

const app = express()
app.use(express.json());


app.get('/coupons', getCoupons)

app.post('/coupons', postCoupons)

app.patch('/coupons', patchCoupons) 

app.delete('/coupons', deleteCoupons)

app.get('/stores', getStores)

app.post('/stores', postStores)

app.delete('/stores', deleteStores)




app.listen(3000);

(async () => {   
    await dbCreateConnection(); 
})();
