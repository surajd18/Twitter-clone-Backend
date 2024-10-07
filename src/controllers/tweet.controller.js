import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Tweet } from "../models/tweets.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
  
    if (!content) {
      throw new ApiError(400, "Content is Required!");
    }
  
    const tweet = await Tweet.create({
      content,
      owner: req.user?._id,
    });
  
    if (!tweet) {
      throw new ApiError(500, "Failed to create tweet!");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, tweet, "Tweet created succesfully!"));
  } catch (error) {
    throw new ApiError(500,"Something went wrong while creating Tweet!");
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;
  
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid User ID!");
    }
  
    const tweets = await Tweet.aggregate([
      {
        $match: {
          owner: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          content: 1,
          createdAt: 0,
          "user.username": 1,
          "user.fullname": 1,
        },
      },
    ]);
  
    if (!tweets.length) {
      throw new ApiError(400, "Teets not Exist!!");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, tweets, "Tweets fetched Successfuly!"));
  } catch (error) {
    throw new ApiError(500,"Something went wrong while fetching Tweet!");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { tweetId } = req.params;
  
    if (!content) {
      throw new ApiError(400, "content is required!");
    }
  
    if (!isValidObjectId(tweetId)) {
      throw new ApiError(400, "Invalid tweetId!");
    }
  
    const tweet = await Tweet.findById(tweetId);
  
    if (!tweet) {
      throw new ApiError(404, "Tweet not found!");
    }
  
    if (tweet?.owner.tostring() !== req.user._id.tostring()) {
      throw new ApiError(400, "Only owners can edit the  tweet!");
    }
  
    const newTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  
    if (!newTweet) {
      throw new ApiError(500, "Failed to update the tweet!");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, newTweet, "Tweet updated Succesfully!"));
  } catch (error) {
    throw new ApiError(500,"Something went wrong while update Tweet!");
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
      throw new ApiError(400, "Invalid tweetId!");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      throw new ApiError(404, "Tweet not found!");
    }

    if (tweet?.owner.tostring() !== req.user._id.tostring()) {
      throw new ApiError(400, "Only owners can edit the  tweet!");
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res
      .status(200)
      .json(new ApiResponse(200, newTweet, "Tweet updated Succesfully!"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message.tostring() || "Failed to delete the tweet!"
    );
  }
});

export { createTweet, deleteTweet, updateTweet, getUserTweets };
