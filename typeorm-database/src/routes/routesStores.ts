import { Router } from "express";
import { getStores, postStores, deleteStores } from "../controllers/stores.controller";

const router = Router();

router.get("/stores", getStores);
router.post("/stores", postStores);
router.delete("/stores", deleteStores);

export = router