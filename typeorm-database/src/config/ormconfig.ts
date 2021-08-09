import { ConnectionOptions } from "typeorm";
require('dotenv').config();


const config : ConnectionOptions = {
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['**/src/entity/*.js'],
    schema: "rooftop-backend-challenge",
    synchronize: Boolean(false),
    logging: Boolean(process.env.TYPEORM_LOGGING),
};

export = config;