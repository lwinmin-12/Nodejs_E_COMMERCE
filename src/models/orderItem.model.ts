import mongoose,{Schema} from "mongoose";
import { string } from "yup";
import { orderDocument } from "./order.model";
import { userDocument } from "./user.model";
import {permitDocument} from './product.model'

export interface orderItemDocument extends mongoose.Document{
    order : orderDocument['_id']
    productId : permitDocument['_id']
    count : number
    name : string
    price : number
    status : string[]
    create: Date
}

const OrderItemSchema = new Schema({
    order : {type : Schema.Types.ObjectId, ref : "order" , require : true},
    productId : [{type : Schema.Types.ObjectId , ref : "product" , required : true}],
    count : {type : Number , default : 1},
    name : {type : string , required : true},
    price : {type : Number , required : true},
    status : {type : string, enum:["ACCEPT" , "PENDING" , "DELIVERED"], default : "ACCEPT"},
    created :{type: Date , default : Date.now}
})

const Order = mongoose.model<orderItemDocument>("order" , OrderItemSchema)
export default Order