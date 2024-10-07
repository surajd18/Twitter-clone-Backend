import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { appendFile } from "fs";

const toggleVideoLike = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
      throw new ApiError(401, "Invalid video Id!");
    }

    const alreadyLiked = await Like.findOne({
      video: videoId,
      likedBy: req.user?._id,
    });

    if (alreadyLiked) {
      await Like.findByIdAndDelete(alreadyLiked?._id);

      return res
        .status(200)
        .json(
          new ApiResponse(200, { isliked: false }, "Unliked Successfully!!")
        );
    }

    const like = await Like.create({
      video: videoId,
      likedBy: req.user?._id,
    });

    if (!like) {
      throw new ApiError(401, "something went wrong while liking the video!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { isliked: true }, "video liked successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while toggle video like!");
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
      throw new ApiError(401, "Invalid comment Id!");
    }

    const alreadyLiked = await Like.findOne({
      comment: commentId,
      likedBy: req.user?._id,
    });

    if (alreadyLiked) {
      await Like.findByIdAndDelete(alreadyLiked?._id);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { isliked: false },
            "Unliked Comment Successfully!!"
          )
        );
    }

    const like = await Like.create({
      comment: commentId,
      likedBy: req.user?._id,
    });

    if (!like) {
      throw new ApiError(401, "something went wrong while liking the comment!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { isliked: true }, "comment liked successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while toggle comment like!");
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
      throw new ApiError(401, "Invalid Tweet Id!");
    }

    const alreadyLiked = await Like.findOne({
      tweet: tweetId,
      likedBy: req.user?._id,
    });

    if (alreadyLiked) {
      await Like.findByIdAndDelete(alreadyLiked?._id);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { isliked: false },
            "Unliked Tweet Successfully!!"
          )
        );
    }

    const like = await Like.create({
      tweet: tweetId,
      likedBy: req.user?._id,
    });

    if (!like) {
      throw new ApiError(401, "something went wrong while liking the tweet!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { isliked: true }, "Tweet liked successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while toggle Tweet like!");
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Like.aggregate([
      {
        $match: {
          likedBy: mongoose.Types.ObjectId(req.user?._id),
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "video",
          foreignField: "_id",
          as: "videos",
        },
      },
      {
        $unwind: "$videos",
      },
      {
        $project: {
          _id: 0,
          "videos._id": 0,
          "videos.videoFile.url": 1,
          "videos.thumbnail.url": 1,
          "videos.title": 1,
          "videos.description": 1,
          "videos.views": 1,
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Videos feched successfully!!"));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching liked videos!!"
    );
  }
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
