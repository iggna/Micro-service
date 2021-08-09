"use strict";
var express_1 = require("express");
var coupons_controller_1 = require("../controllers/coupons.controller");
var router = express_1.Router();
router.get("/coupons", coupons_controller_1.getCoupons);
router.post("/coupons", coupons_controller_1.postCoupons);
router.patch("/coupons", coupons_controller_1.patchCoupons);
router["delete"]("/coupons", coupons_controller_1.deleteCoupons);
module.exports = router;
