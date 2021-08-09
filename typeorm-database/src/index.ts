import "reflect-metadata";
import express from "express";
import { dbCreateConnection } from "./typeorm/createConnection";
import routesCoupons from "./routes/routesCoupons"
import routesStores from "./routes/routesStores"
import routesStats from "./routes/routesStats"


import "dotenv/config";

require('dotenv').config()

const app = express();
app.use(express.json());


app.use(
    routesCoupons, 
    routesStores, 
    routesStats
    );


app.listen(process.env.PORT);

(async () => {   
    await dbCreateConnection(); 
})();
