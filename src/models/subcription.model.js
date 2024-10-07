import mongoose, { Schema } from "mongoose";

const subcriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //One who subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //One to whom subscribing
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Subcription = mongoose.model("Subcription", subcriptionSchema);
