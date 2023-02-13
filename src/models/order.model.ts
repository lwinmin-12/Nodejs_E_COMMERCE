import mongoose,{Schema} from "mongoose";
import { userDocument } from "./user.model";

export interface orderDocument extends mongoose.Document{
    user : userDocument['_id']
    items : any
    count : number
    total : number
    create: Date
}

const OrderSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "user" , require : true},
    items : [{type : Schema.Types.ObjectId , ref : "orderitem"}],
    count : {type : Number , required : true},
    total : {type : Number , required : true},
    created :{type: Date , default : Date.now}
})

const Order = mongoose.model<orderDocument>("order" , OrderSchema)
export default Order