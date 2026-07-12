import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

    id:{

    },
    watchHistory:[
        {
            type:Schema.Types.objectId,
            ref:"video"
        }
    ],
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    fullName:{
        type:String,
        required:true,
        
        trim:true,


    },
    avatar:{

        type:String, // cloudinary url
        required:true,
    },
    coverImage:{
        type:String, // cloudinary url
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String,

    },
    
},{timestamps:true});


export const user=mongoose.model("user",userSchema);