import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();



// routes import
import userRouter from "./routes/user.routes.js";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "16kb",

}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",

}));

// public is the folder name 
app.use(express.static("public"));

app.use(cookieParser());

// Health Checkup
app.get("/api/v1/health", (req, res) => {
    try {
        return res.status(200).json({
            status: "ok",
            message: "server is UP",
        });
    } catch (error) {
        return res.status(500).json({
            message: "server is Down",
            error: error.message,
        });
    }
});



// // routes import
// import userRouter from "./routes/user.routes.js";



// routes declaration
app.use("/api/v1/users", userRouter);



export { app };


