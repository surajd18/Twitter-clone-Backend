
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    console.log("Mongo DB Trying to connect")
    console.log("Mongo DB String", process.env.MONGO_URL);
    const connectionInstace = await mongoose.connect(
      "mongodb+srv://suraj:suraj123@cluster0.0aobp.mongodb.net/Youtube"
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
