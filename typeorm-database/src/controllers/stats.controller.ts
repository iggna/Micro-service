import express, { Response, Request } from "express";
import {authSchema, authEmail} from "../Joi/validation_schema";
import Rdate from "../Rdate/randomDate";
import { Coupon } from "../entity/coupon";
import { FindConditions, getRepository, Equal } from "typeorm";

export const getStats = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);

    // const existingCoupons = repository.findAndCount(id)
    // const assignedCoupons = repository.findAndCount({where: {assignedAt !== undefined}})
    // const NOTassignedCoupons = repository.findAndCount({where: {assignedAt === undefined}})
    // const DAYassignedCoupons = repository.findAndCount({where: {assignedAt === undefined}})
}