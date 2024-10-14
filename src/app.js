import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import morganMiddleware from "./middlewares/log.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieparser());
app.use(morganMiddleware);



//import routes
import userRouter from './routes/user.router.js';
import tweetRouter from './routes/tweet.router.js';
import subscriptionRouter from './routes/subscription.router.js'
import likeRouter from './routes/like.router.js'

//declaration of routes

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tweet",tweetRouter);
app.use("/api/v1/subscription",subscriptionRouter);
app.use("/api/v1/like",likeRouter);



export default app;
