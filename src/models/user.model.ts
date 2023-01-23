import mongoose from "mongoose";
import {Schema} from "mongoose"
import { roleDocument } from "./role.model";


export interface userDocument extends mongoose.Document{ 
    email: string;
    name: string;
    password: string;
    roles : roleDocument['_id']
    permits : string
}



const userSchema = new Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true },
    phone : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    roles : [{type : Schema.Types.ObjectId ,'ref' : 'role'}],
    permits :[ {type : Schema.Types.ObjectId , 'ref' : 'permit'}],
    created : {type : Date , default : Date.now},
})

const User = mongoose.model <userDocument>  ('user' , userSchema);
export default User