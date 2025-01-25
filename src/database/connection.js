
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    console.log("Mongo DB TRying to connect")
    const connectionInstace = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );

    console.log(
      `MONGO_DB Connected !! DB_HOST : ${connectionInstace.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection error ", error);
    process.exit(1);
  }
};

export default connectDB;
