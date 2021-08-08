import express, { Response, Request } from "express";
import {authSchema, authEmail} from "../Joi/validation_schema";
import Rdate from "../Rdate/randomDate";
import { Coupon } from "../entity/coupon";
import { FindConditions, getRepository, Equal, Repository } from "typeorm";


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
    const repository = getRepository(Coupon);

    try {
        const coupon = await repository.findOneOrFail({code});
            if (code === coupon.code) {
                res.status(422).send('there is already a coupon created with that code');
            } else {
                //Da error a partir de este if, no crea cupon, borrar if arriba para que funcione
            const codeCheck = await authSchema.validateAsync({code});
            if (codeCheck) {
                const newCoupon = new Coupon();
                newCoupon.code = code
                newCoupon.expiresAt = (Rdate);
                repository.save(newCoupon);
                res.sendStatus(201);
            }
        }
        // 
        //verificar si esta deleted_at para reasignarlo nuevamente
    } catch(err) {
        res.sendStatus(422);
    }
}

export const patchCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const customer_email: string = (req.query.customer_email as string);
    const date: Date = new Date(); 

    const emailCheck = await authEmail.validateAsync({customer_email})
    //verificar que ese email no fue dado de baja
    try {
        if (emailCheck && emailCheck.deleted_at === null) {
            if (await repository.findOne({customer_email})) {
                res.status(422).send({message: 'there is already a coupon asigned to that email'});
                } else {
                const result = await repository.findOneOrFail({ where: { customer_email: null }});
                result.customer_email = customer_email
                result.assignedAt = date
                repository.save(result);
                res.sendStatus(201);
            } 
        }
    } catch(err) {
        res.sendStatus(422).send({message: 'email not valid or deleted'});
        //no esta enviando el error cuando el email no es valido
    }   
}

export const deleteCoupons = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);
    const date: Date = new Date();
    const id = req.query!;
    
    try {
        const idResult = await repository.findOneOrFail(id);
        //verificar que id no fue dado de baja previamente
            if(idResult.customer_email === null && idResult.deleted_at == null) {
                repository.softDelete(id);
                idResult.deleted_at = date;
                res.sendStatus(201);
            } else {
                res.status(404).send({message: 'The coupon requested already has an email assigned'})
            }  
    } catch (err) {
        res.status(404).send({message: 'Coupon not found'});
    }   
}