import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like",
            required:true
        }
    ]
});

export default commentSchema;