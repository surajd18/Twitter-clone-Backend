import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.route("/create-tweet").post(jwtVerify, createTweet);
router.route("/update-tweet/:tweetId").patch(jwtVerify, updateTweet);
router.route("/delete-tweet/:tweetId").delete(jwtVerify, deleteTweet);
router.route("/getuser-tweets").get(jwtVerify, getUserTweets);

export default router;
