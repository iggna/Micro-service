import express, { Response, Request, application } from "express";
import { Coupon } from "../entity/coupon";
import { Store } from "../entity/store";
import { FindConditions, getRepository, Equal } from "typeorm";

const getStores = async function (req: Request, res: Response) {
    
}