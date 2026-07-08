// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { DB_NAME } from "../constants.js";

// dotenv.config();

// const dbConnect = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(`process.env.MONGODB_URI, {
//       dbName: DB_NAME,
//     }`);
//     console.log(`\nMongoDB connected !! DB host : ${connectionInstance.connection.host}`);
//   } catch (error) {
//     console.log("Mongodb connection error", error);
//     process.exit(1);
//   }
// };

// export default dbConnect;
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config({
  path: "../.env",
});

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: DB_NAME,
      }
    );

    console.log(
      `MongoDB Connected!! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default dbConnect;