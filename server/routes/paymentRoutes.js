import express from "express";
import { checkoutsuccess, createCheckoutSession } from "../controller/paymentController.js";
import { protectRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/create-success", protectRoute, checkoutsuccess);

export default router;
