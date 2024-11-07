import Coupon from "../models/CouponsModel.js";

export const getAllCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.status(200).json(coupon || null);
  } catch (error) {
    console.log("Error in getAllCoupons", error);
    res.status(500).json({ message: error.message });
  }
};
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    if (coupon.expiryDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ message: "Coupon expired" });
    }
    res.status(200).json({
        message:"Coupon valid",
        code:coupon.code,
        discountPercentage:coupon.discountPercentage
    });
  } catch (error) {
    console.log("Error in validateCoupon", error);
    res.status(500).json({ message: error.message });
  }
};
