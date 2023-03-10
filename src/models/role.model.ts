import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { permitDocument } from './permit.model'

export interface roleDocument extends mongoose.Document {
    name : string,
}

export interface roleSecDocument extends roleDocument , mongoose.Document{
    permits : permitDocument['_id']
}

const roleSchema = new Schema({
    name : {type : String , required : true , unique : true},
    permits :[{type :Schema.Types.ObjectId , 'ref' : 'permit'}]
})

const Role = mongoose.model <roleDocument> ('role' , roleSchema);
export default Role