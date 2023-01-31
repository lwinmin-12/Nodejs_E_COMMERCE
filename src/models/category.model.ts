import mongoose, { mongo } from "mongoose";
import {Schema} from "mongoose"

export interface categoryDocument extends mongoose.Document{
    name : string
    image : string
    subcats : object[]
    created : Date 
}

const CategorySchema = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    subcats : [{type : Schema.Types.ObjectId , ref : "subcat"}],
    created : {type : Date , default : Date.now}
})

const Category = mongoose.model<categoryDocument>("category" , CategorySchema)
export default Category