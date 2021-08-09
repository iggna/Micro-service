"use strict";
var express_1 = require("express");
var stores_controller_1 = require("../controllers/stores.controller");
var router = express_1.Router();
router.get("/stores", stores_controller_1.getStores);
router.post("/stores", stores_controller_1.postStores);
router["delete"]("/stores", stores_controller_1.deleteStores);
module.exports = router;
