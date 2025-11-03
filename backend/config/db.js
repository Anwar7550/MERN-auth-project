import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables (important for local development/testing)
dotenv.config();

// Get the MongoDB URL from environment variables
const MongoURL = process.env.MONGO_URL;

// Check if MongoURL is set before proceeding
if (!MongoURL) {
  throw new Error("MONGO_URL environment variable is not defined.");
}

// 1. Declare a cached variable globally.
// This ensures the connection is persisted across serverless function invocations
// within the same execution environment (container).
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const ConnectDB = async () => {
  // 2. Reuse existing connection if available
  if (cached.conn) {
    console.log("MongoDB Atlas is connected (reused)");
    return cached.conn;
  }

  // 3. Reuse connection promise if one is already being established
  if (!cached.promise) {
    // Mongoose options recommended for serverless environments
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering for serverless
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    };

    // Start connection attempt and cache the promise
    cached.promise = mongoose
      .connect(MongoURL, opts)
      .then((mongoose) => {
        console.log("MongoDB Atlas is connected successfully (new)");
        return mongoose;
      })
      .catch((error) => {
        // Clear the promise so a new attempt can be made on the next request
        cached.promise = null;
        console.error("DB connection is error", error);
        throw error;
      });
  }

  // 4. Wait for the connection to resolve (either an ongoing attempt or a new one)
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // If the promise rejects, throw the error
    throw error;
  }
};

export default ConnectDB;

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// const MongoURL = process.env.MONGO_URL;

// const ConnectDB = async () => {
//   try {
//     await mongoose.connect(MongoURL);
//     console.log("MongoDB Atlas is connected successfully");
//   } catch (error) {
//     console.log("DB connection is error", error);
//     process.exit(1);
//   }
// };

// export default ConnectDB;
