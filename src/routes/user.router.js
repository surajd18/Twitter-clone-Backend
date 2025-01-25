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

router.route("/register").post(
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

router.route("/login").post(LogInUser);

//secured ROutes
router.route("/logout").post(jwtVerify, LogOut);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(jwtVerify, changeCurrentPassword);
router.route("/current-user").get(jwtVerify, getcurrentUser);
router.route("/update-account").patch(jwtVerify, updateAccountdetails);
router.route("/avatar").patch(jwtVerify, upload.single("avatar"), updateAvatar);
router
  .route("/cover-image")
  .patch(jwtVerify, upload.single("coverImage"), updateCoverImage);
router.route("/c/:username").get(jwtVerify, getUserChannelProfile);
router.route("/history").get(jwtVerify, getWatchHistory);

export default router;
