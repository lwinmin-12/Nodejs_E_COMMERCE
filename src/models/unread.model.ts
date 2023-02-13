import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { userDocument } from './user.model';

export interface unreadDocument extends mongoose.Document {
    from : userDocument['_id']
    to : userDocument['_id']
}

const UnreadSchema = new Schema({
    from : {type : Schema.Types.ObjectId, ref : "user" , require : true},
    to : {type : Schema.Types.ObjectId, ref : "user" , require : true},
    created : {type : Date , default : Date.now}
})

const Unread = mongoose.model <unreadDocument> ('unread' , UnreadSchema);
export default Unread