import mongoose, { Schema, Types } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { video } from "./video.model.js";
const userSchema = new mongoose.Schema({

    id: {

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullName: {
        type: String,
        required: true,

        trim: true,


    },
    avatar: {

        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String,

    },

}, { timestamps: true });

userSchema.pre("save", async function () {  //pre() is called a Mongoose middleware (or hook).
    if (this.isModified("password")) {       //"save" means before the .save() operation is executed.
        this.password = await bcrypt.hash(this.password, 10);//Here, this refers to the current user document being saved.
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            id: this.id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            //_id:this._id
            id: this.id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);