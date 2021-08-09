import { Router } from "express";
import { getCoupons, postCoupons, patchCoupons, deleteCoupons } from "../controllers/coupons.controller";


const router = Router();

router.get("/coupons", getCoupons);
router.post("/coupons", postCoupons);
router.patch("/coupons", patchCoupons);
router.delete("/coupons", deleteCoupons);

export = router
