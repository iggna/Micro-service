import { createConnection, Connection } from "typeorm";
import config from "../config/ormconfig";

export const dbCreateConnection = async (): Promise<Connection | null> =>{
    try {
        await createConnection(config)
        console.log('Database connection success.');
    } catch (error) {
        console.log(error)
    }
    return null
}