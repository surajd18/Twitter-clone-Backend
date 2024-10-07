import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubcription } from "../controllers/subscription.controller.js";



const router = Router();

router.route("/toggle-subscription/c/:channelId").post(jwtVerify, toggleSubcription);
router.route("/subscribers/c/:channelId").get(jwtVerify, getUserChannelSubscribers);
router.route("/subscribed-channels/u/:subscriberId").get(jwtVerify, getSubscribedChannels);


export default router;