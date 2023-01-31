import mongoose, { mongo } from "mongoose";
import {Schema} from "mongoose"
import { subCatsDocument } from "./subCats.model";

export interface childecatDocument extends mongoose.Document{
    name : string
    image : string
    subcatId : subCatsDocument["_id"]
    created : Date 
}

const childcatsModel = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    subcatId : {type : Schema.Types.ObjectId , ref : "subcat"},
    created : {type : Date , default : Date.now}
})

const Childcat = mongoose.model <childecatDocument> ("childcat" , childcatsModel)
export default Childcat