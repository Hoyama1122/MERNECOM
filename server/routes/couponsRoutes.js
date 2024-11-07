import express from "express";
import { getAllCoupons, validateCoupon } from "../controller/couponsController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/',protectRoute,getAllCoupons)
router.get('/validate',protectRoute,validateCoupon)

export default router;