import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoDb).then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
    });
  } catch (error) {
    console.log("Error connecting mongoDB", error.message);
    process.exit(1);
  }
};
