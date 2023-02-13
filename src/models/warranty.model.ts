import mongoose from "mongoose";
import {Schema} from "mongoose"

export interface warrantyDocumnent extends mongoose.Document{
    name : string
    image : string
    remark : any
    create: Date
}

const warrantySchema = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    remark : { type : Array },
    created : {type : Date , default : Date.now}
})

const Warranty = mongoose.model("warranty" , warrantySchema)
export default Warranty