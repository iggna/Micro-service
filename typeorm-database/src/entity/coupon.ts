import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: "coupons" })
export class coupon {

    @Column()
    assigned_at: string;

    @Column()
    code: number;

    @Column()
    customer_email: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    expires_at: string;

}
