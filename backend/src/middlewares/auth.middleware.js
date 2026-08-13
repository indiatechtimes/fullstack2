import { asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/api_error.js"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";




const verifyJWT = asyncHandler(async (req, _, next) => {
    try {


        const token = req.cookies?.accessToken || req.header
            ("Authorization")?.replace("Bearer ", "");

        //console.log(`Token= ${token}`);


        if (!token) {
            throw new ApiError(401, "unathorize request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "invalid access token")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "invalid accessToken")
    }


});

export { verifyJWT };