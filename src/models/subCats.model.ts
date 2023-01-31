import mongoose, { mongo } from "mongoose";
import {Schema} from "mongoose"
import { categoryDocument } from "./category.model";

export interface subCatsDocument extends mongoose.Document{
    name : string
    image : string
    catId : categoryDocument["_id"]
    childCats : object[]
    created : Date 
}

const subCatsModel = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    catId : {type : Schema.Types.ObjectId , ref : "category"},
    childcats : [{type : Schema.Types.ObjectId , ref : "childcat"}],
    created : {type : Date , default : Date.now}
})

const Subcats = mongoose.model <subCatsDocument> ("subcat" , subCatsModel)
export default Subcats