import { asyncHandler } from "../utils/async_handler.js";


import { ApiError } from "../utils/api_error.js";

import { User } from "../models/user.model.js";
import { configDotenv } from "dotenv";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api_response.js";



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


    // get user detail from frontend
    const { fullName, email, userName, password } = req.body;

    // for testing
    console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("userName:", userName);
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

    const existedUser = await User.findOne({
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
        console.log("user is already exist");
        throw new ApiError(409, "user already exist");
    };


    // multer gives us 
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;


    if (!avatar) {
        throw new ApiError(400, "Try Again");

    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase(),

    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"// password and refreshToken is hided
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }


    return res.status(200).json(
        new ApiResponse(200, createdUser, "user Registered succesfully")
    );


});

export { registerUser };