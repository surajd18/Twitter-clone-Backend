import { Router } from "express";
import {
  LogInUser,
  LogOut,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getcurrentUser,
  updateAccountdetails,
  updateAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { verify } from "jsonwebtoken";

const router = Router();

router.route("/api/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/api/login").post(LogInUser);

//secured ROutes
router.route("/api/logout").post(jwtVerify, LogOut);
router.route("/api/refresh-token").post(refreshAccessToken);
router.route("/api/change-password").post(jwtVerify, changeCurrentPassword);
router.route("/api/current-user").get(jwtVerify, getcurrentUser);
router.route("/api/update-account").patch(jwtVerify, updateAccountdetails);
router.route("/api/avatar").patch(jwtVerify, upload.single("avatar"), updateAvatar);
router
  .route("/api/cover-image")
  .patch(jwtVerify, upload.single("coverImage"), updateCoverImage);
router.route("/api/c/:username").get(jwtVerify, getUserChannelProfile);
router.route("/api/history").get(jwtVerify, getWatchHistory);

export default router;
