import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface tagDocument extends mongoose.Document{
    name : string
    image : string
    created : Date 
}

const tagModel = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    created : {type : Date , default : Date.now}
})

const tag = mongoose.model<tagDocument>("tag" , tagModel)
export default tag