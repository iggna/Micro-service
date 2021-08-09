"use strict";
var express_1 = require("express");
var stats_controller_1 = require("../controllers/stats.controller");
var router = express_1.Router();
router.get("/stats", stats_controller_1.getStats);
module.exports = router;
