import {Entity, PrimaryGeneratedColumn, DeleteDateColumn, Column} from "typeorm";

@Entity({ name: "coupons" })
export class Coupon {

    @Column({ 
        name: "assigned_at", 
        nullable: true 
    })
    assignedAt!: Date;

    @Column({ 
        name: "created_at", 
        nullable: true 
    })
    createdAt!: Date;

    @Column({
        width : 8,
        nullable: true
    })
    code!: string;

    @Column({
        nullable: true
    })
    customer_email!: string;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ 
        name: "expires_at",
        nullable: true
    })
    expiresAt!: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deleted_at!: Date;
}