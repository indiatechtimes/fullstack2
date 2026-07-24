import { asyncHandler } from "../utils/async_handler.js";


const registerUser = asyncHandler( async (req , res )=>{
    // res.status(200).json({
    //     message:"ok"
    // })

    // to register user 
    // get user detail from frontend
    //validation - not empty any field
    //check if user already exists : from username,email
    //check for images , check for avatar
    //upload them to cloudinary, check avatar is uploaded
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return res

     req.body



})

export {registerUser};