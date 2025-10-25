import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MongoURL = process.env.MONGO_URL;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MongoURL);
    console.log("MongoDB Atlas is connected successfully");
  } catch (error) {
    console.log("DB connection is error", error);
    process.exit(1);
  }
};

export default ConnectDB;
