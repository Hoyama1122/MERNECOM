import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import couponsRoutes from "./routes/couponsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import Analytics from "./routes/Analytics.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", Analytics);

app.listen(port, async () => {
  await ConnectDB();
  console.log("Server is running on http://localhost:" + port);
});