import dotenv from "dotenv";

dotenv.config();

import connectDB from "./database/connection.js";
import app from "./app.js";

connectDB()
    .then(() => {
        app.get('/', (req, res) => {
            res.send(`<center><h1>Server is live!!🟢</h1></center>`);
        })


        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONOGDB connection failed...", err)
    })


