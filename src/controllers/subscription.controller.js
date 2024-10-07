import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subcription } from "../models/subcription.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubcription = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
      throw new ApiError(400, "Invalid Channel ID");
    }

    const isSubscribed = await Subcription.findOne({
      subscriber: req.user?._id,
      channel: channelId,
    });

    if (isSubscribed) {
      await Subcription.findByIdAndDelete(isSubscribed?._id);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { subscribed: false },
            "Unsubscribed Successfully!"
          )
        );
    }

    const subs = await Subcription.create({
      subscriber: req.user?._id,
      channel: channelId,
    });

    if (!subs) {
      throw new ApiError(500, "Failed to Subscribe!");
    }

    return res.status(200).json(200, subs, "Subscribed successfully!");
  } catch (error) {
    throw new ApiError(500, "Something went wrong in Subscription!!");
  }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  try {
    let { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
      throw new ApiError(400, "Invalid Channel ID");
    }

    const subscriber = await Subcription.aggregate([
      {
        $match: {
          channel: mongoose.Types.ObjectId(channelId),
        },
      },
      {
        $lookup: {
          from:"users",
          localField:"subscriber",
          foreignField:"_id",
          as:"subscribers"
        },
      },
      {
        $unwind: "$subscriber",
      },
      {
        $project:{
          _id:0,
          'subscribers.fullname':1,
          'subscribers.avatar':1,
          'subscribers.username':1
        }
      }
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(200, subscribers, "subscribers fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500,"Something Went wrong while Fetching subscribers!")
  }
});

const getSubscribedChannels = asyncHandler(async(req,res)=>{
  try {
    let {subscriberId} = req.params;

    const channels = await Subcription.aggregate([
      {
        $match:{
          subscriber:mongoose.Types.ObjectId(subscriberId),
        }
      },{
        $lookup:{
          from:"users",
          localField:"subscriber",
          foreignField:"_id",
          as:"channels"
        }
      },
      {
        $unwind:'$channels'
      },
      {
        $project:{
          _id:0,
          'channels.fullname':1,
          'channels.username':1,
          'channels.avatar':1
        }
      }
    ])
    return res.status(200).json(new ApiResponse(200,channels,"Subscribed Channels Fetched Succesfully!"))    
  } catch (error) {
    throw new ApiError(500,"something went wrong while fetching the channels")
  }
})

export {getSubscribedChannels,getUserChannelSubscribers,toggleSubcription};