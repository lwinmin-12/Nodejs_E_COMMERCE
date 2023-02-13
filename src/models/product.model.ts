import mongoose from "mongoose";   
import {Schema} from "mongoose"
import { categoryDocument } from "./category.model";
import { childecatDocument } from "./childCats.model";
import { deliveryDocument } from "./delivery.model";
import { subCatsDocument } from "./subCats.model";
import { tagDocument } from "./tag.model";

export interface productInput {
    name : string
    price : number
    brand    : string
    discount: number
    features : any
    desc : []
    detail : []
    colors : any
    size : string
    rating : string
    image : []
    status : boolean

}

export interface permitDocument extends productInput , mongoose.Document {
   cats : categoryDocument['_id']
   subcat : subCatsDocument['_id']
   childcat : childecatDocument['_id']
   tag : tagDocument["_id"]
   delivery: deliveryDocument["_id"]
   warranty: deliveryDocument["_id"]
}

const ProductSchema = new Schema({
    name : {type: String , required: true, unique: true},
    price:{type:Number, required : true},
    brand    : {type: String , required : true},
    cats : {type : Schema.Types.ObjectId,ref : "category"},
    subcat : {type : Schema.Types.ObjectId,ref : "subcat"},
    childcat : {type : Schema.Types.ObjectId,ref : "childcat"},
    tag : {type : Schema.Types.ObjectId , ref : "tag"},
    discount : {type : Number , default : 0},
    features : {type : Array , required : true},
    desc : {type : Array , required : true},
    detail : {type : Array , required : true},
    status : {type : Boolean , default : true},
    delivery : [{type : Schema.Types.ObjectId,ref : "delivery"}],
    warranty : [{type : Schema.Types.ObjectId,ref : "warranty"}],
    colors :{type : Array , required : true},
    size :{type : String , required : true},
    rating :{type : String , default : "0"},
    images :{type : Array , required : true},
    created : {type : Date , default : Date.now}
})
const Product =  mongoose.model <permitDocument> ('product' , ProductSchema)
export default Product