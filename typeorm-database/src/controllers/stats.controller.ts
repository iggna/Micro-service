import express, { Response, Request } from "express";
import { Coupon } from "../entity/coupon";
import { FindConditions, getRepository, Equal, IsNull, Not } from "typeorm";

export const getStats = async function (req: Request, res: Response) {
    const repository = getRepository(Coupon);

    const existingCoupons = await repository.find({where: {deleted_at : IsNull()}});
    const totalExisting = existingCoupons.length

    const assignedCoupons = await repository.find({where: {assignedAt : Not(IsNull()), deleted_at : IsNull()}});
    const assigned = assignedCoupons.length

    const notAssignedCoupons = await repository.find({where: {assignedAt : (IsNull()), deleted_at : IsNull()}});
    const notAssigned = notAssignedCoupons.length

    const assignedCouponsPerDay = await getRepository(Coupon)
    .createQueryBuilder("coupons")
    .select("COUNT(*), date_trunc('day', assigned_at) as date")
    .groupBy("date_trunc('day', assigned_at)")
    .execute()

    const createdCouponsPerDay = await getRepository(Coupon)
    .createQueryBuilder("coupons")
    .select("COUNT(*), date_trunc('day', created_at) as date")
    .groupBy("date_trunc('day', created_at)")
    .execute()

    res.json({totalExisting, assigned, notAssigned, assignedCouponsPerDay, createdCouponsPerDay});
}