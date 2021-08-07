import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn} from "typeorm";
import "reflect-metadata"

@Entity({ name: "stores" })
export class Store {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @DeleteDateColumn({
        nullable: true
    })
    deleted_at!: Date;
}
