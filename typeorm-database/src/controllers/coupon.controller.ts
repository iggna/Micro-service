import express, { Response, Request } from "express";
import {authSchema, authEmail} from "../Joi/validation_schema";
import Rdate from "../Rdate/randomDate";
import { Coupon } from "../entity/coupon";
import { FindConditions, getRepository, Equal } from "typeorm";


export const getCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const code :string = (req.query.code as string);
    const customer_email :string = (req.query.customer_email as string);
    
    const coupon = await repository.findOne({code});
        if (coupon !== undefined) {
            if (coupon.customer_email === customer_email){
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
}

export const postCoupons = async function (req: Request, res: Response) {
    const code :string = (req.query.code as string);

    try {
        await authSchema.validateAsync({code})
        
        const newCoupon = new Coupon;
        newCoupon.code = code
        newCoupon.expiresAt = (Rdate);
        const repository = getRepository(Coupon);
        repository.save(newCoupon);
        res.sendStatus(201);
    } catch(err) {
        res.sendStatus(404).send({"error": err, "message": 'Something went wrong!'});
    }
}

export const patchCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const customer_email: string = (req.query.customer_email as string);
    const date: Date = new Date(); 

    try {
        const emailCheck = await authEmail.validateAsync({customer_email})
        if (emailCheck) {
            if (await repository.findOne({customer_email})) {
                res.status(422).send({message: 'there is already a coupon asigned to that email'});
                } else {
                const result = await repository.findOneOrFail({ where: { customer_email: null } });
                result.customer_email = customer_email
                result.assignedAt = date
                repository.save(result);
                res.sendStatus(201);
            }
        }
    } catch(err) {
        res.sendStatus(422).send({message: 'email not valid'});
    }        
}

export const deleteCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const id: number = (req.body.id as number);
    const idResult = await repository.findOne({id});
    try {
        if(idResult) {
            const search = await repository.find({ where: { customer_email: null } });
            repository.softDelete({id});
            res.sendStatus(201);
        } 
    } catch (err) {
        res.sendStatus(404);
    }   
}