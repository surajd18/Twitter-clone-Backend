import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";


const router = Router();

router.route('/toggle-videlike/v/:videoID').post(jwtVerify,toggleVideoLike);
router.route('/toggle-commentlike/c/:commentId').post(jwtVerify,toggleCommentLike);
router.route('/toggle-tweetlike/t/:tweetId').post(jwtVerify,toggleTweetLike);
router.route('/getliked-videos').post(jwtVerify,getLikedVideos);


export default router;