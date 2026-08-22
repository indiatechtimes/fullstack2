import mongoose,{Schema} from "mongoose";

const likeSchema = new Schema({

    comment: {
        type: Schema.Types.ObjectId,
        ref:"Comment"
    },

    video: {
        tpye: Schema.Types.ObjectId,
        ref:"Video"
    },

    likedBy: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },

    tweet: {
        type: Schema.Types.ObjectId,
        ref:"Tweet"
    }
}, { timestamps: true });

export const like=mongoose.Schema