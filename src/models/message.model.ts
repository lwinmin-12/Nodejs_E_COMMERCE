import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { userDocument } from './user.model';

export interface messageDocument extends mongoose.Document {
    from : userDocument['_id']
    to : userDocument['_id']
    type : string
    msg : string
}

const MessageSchema = new Schema({
    from : {type : Schema.Types.ObjectId, ref : "user" , require : true},
    to : {type : Schema.Types.ObjectId, ref : "user" , require : true},
    type : {type : String , enum : ["text" , "image"] , default : "text"},
    msg : {type : String , required : true },
    created : {type : Date , default : Date.now}
})

const Msg = mongoose.model <messageDocument> ('message' , MessageSchema);
export default Msg