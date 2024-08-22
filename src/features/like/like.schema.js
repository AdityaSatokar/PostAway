import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    targetid:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"target"
    },
    target:{
        type:String,
        enum:["Post","Comment"]
    }
});

export default likeSchema;