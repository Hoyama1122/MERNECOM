import express from "express";
const router = express.Router();
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { getAnalyticsDate, getDailySalesData } from "../controller/analyticsController.js";

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsDate();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const DailySalesDaa = await getDailySalesData(startDate, endDate);

    res.status(200).json({ analyticsData, DailySalesDaa });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
export default router;