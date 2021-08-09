import express, { Response, Request } from "express";
import {authSchema, authEmail} from "../Joi/validation_schema";
import Rdate from "../Rdate/randomDate";
import { Coupon } from "../entity/coupon";
import { FindConditions, getRepository, Equal, Repository } from "typeorm";
import { resolve } from "node:path";


export const getCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const code :string = (req.query.code as string);
    const customer_email :string = (req.query.customer_email as string);

    try {
        const coupon = await repository.findOneOrFail({code, customer_email});

        if (coupon !== undefined && coupon.deleted_at == undefined) {
            if (coupon.customer_email === customer_email && coupon.code === code){
                res.sendStatus(200);
            }
        } else {
            res.status(404).send({message: 'this coupon is already deleted'})
        }
    } catch (err) {
        res.status(404).send({message: 'email or coupon not found/ not matching'});  
    }
}

export const postCoupons = async function (req: Request, res: Response) {
    const code :string = (req.query.code as string);
    

    try {
        await authSchema.validateAsync({code});
        const repository = await getRepository(Coupon);

        const coupon = await repository.findOne({code});
            if (coupon !== undefined && code === coupon.code) {
                    return res.status(422).json({message: 'there is already a coupon created with that code'});
                } else {
                    const newCoupon = new Coupon();
                    newCoupon.code = code
                    newCoupon.expiresAt = (Rdate);
                    await repository.save(newCoupon);
                    res.sendStatus(201);
            }
    } catch(err) {
        res.sendStatus(422).send({message: err})
    }
}

export const patchCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const customer_email: string = (req.query.customer_email as string);
    const date: Date = new Date(); 

    try {

    await authEmail.validateAsync({customer_email})
    const email = await repository.findOne({customer_email})

        if (email && email!.code !== null) {
            return res.status(422).send({message: 'there is already a coupon asigned to that email'});  
        } else {
            const result = await repository.findOneOrFail({ where: { customer_email: null }});
            result.customer_email = customer_email
            result.assignedAt = date
            repository.save(result);
            res.sendStatus(201);      
        }     
    } catch(err) {
        res.sendStatus(422).send({message: err});
    }   
}

export const deleteCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const date: Date = new Date();
    const id: number = Number(req.query.id as string);
    
    try {
        const idResult = await repository.findOneOrFail({id});
            if(idResult.customer_email === null && idResult.deleted_at == null) {
                await repository.softDelete(id);
                idResult.deleted_at = date;
                res.sendStatus(201);
            } else {
                res.status(404).send({message: 'The coupon requested has an email assigned already'})
            }  
    } catch (err) {
        res.status(404).send({message: 'there was an error, please try again', err})
    }   
}