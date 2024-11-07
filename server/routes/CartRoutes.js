import express from "express";
import {
  addTocart,
  getAllCart,
  removeAllFromCart,
  upadeteQuantity,
} from "../controller/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protectRoute, getAllCart);
router.post("/", protectRoute, addTocart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/", protectRoute, upadeteQuantity);

export default router;
