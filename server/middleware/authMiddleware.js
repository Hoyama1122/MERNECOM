import User from "../models/UserModel.js";

import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(401).send({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(401).send({ message: "Unauthorized" });

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expired" });
      }

      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export const adminRoute = async (req, res, next) => {
  if(req.user && req.user.role === "admin"){
    next();
  }
  else{
    return res.status(401).send({ message: "Admin only" });
  }
}