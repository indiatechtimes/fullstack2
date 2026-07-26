import { asyncHandler } from "../utils/async_handler.js";


import { ApiError } from "../utils/api_error.js";

import { user } from "../models/user.model.js";




const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message:"ok"
    // });
    //res.send("welcome to register user");


    //to register user
    //get user detail from frontend
    //validation - not empty any field
    //check if user already exists : from username,email
    //check for images , check for avatar
    //upload them to cloudinary, check avatar is uploaded
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res


    // for the checking purpose
    const { fullName, email, username, password } = req.body;
    console.log("email:", email);
    console.log("password:", password);

    // actual code 
    if (fullName === "") {
        throw new ApiError(400,
            "full name is required"
        )
    };
    if (email === "") {
        throw new ApiError(400, "email is required");

    };
    if (userName === "") {
        throw new ApiError(400, "username is required")

    };
    if (password === "") {
        throw new ApiError(400, "password is required")

    };

    const existedUser = user.findOne({
        $or: [
            {
                userName
            },
            {
                email
            }

        ]

    });
    if (existedUser) {
        throw new ApiError(409, "user already exist ");
    };






})

export { registerUser };