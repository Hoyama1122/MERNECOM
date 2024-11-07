import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          // นำปีกกาออกให้ถูกต้อง
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      // ย้ายให้อยู่ในระดับเดียวกับ products
      type: Number,
      required: true,
      min: 0,
    },
    stripeSessionId: {
      // เพิ่มจุลภาคหลัง type
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
