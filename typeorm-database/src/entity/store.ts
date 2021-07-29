import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import "reflect-metadata"

@Entity({ name: "stores" })
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

}