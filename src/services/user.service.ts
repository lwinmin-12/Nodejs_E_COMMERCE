import userModel, { userDocument } from "../models/user.model"
import { encode  } from "../utils/helper"
import config from 'config'
import bcrypt from 'bcrypt'



export const addNewUser = async ( payload : userDocument ) => {
    
    // console.log(payload.name)
    let user = await userModel.findOne({name  : payload.name})
    if(user){
        console.log('user already exist')
        return 'user already exist'
    }
    try{
        return await new userModel(payload).save()
    }catch (e : any) {
        return new Error (e)
    }
    
}
export const userRegister = async (payload : userDocument) =>{
   
   const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

   payload.password = await encode(payload.password  , salt )

   try{
    return await new userModel(payload).save()
   }catch(e:any){
    throw new Error("register fail")
   }
}

export const userAddRole = async (userId : userDocument['_id'] , roleId : userDocument['_id']) => {
   try {
    return await userModel.findByIdAndUpdate( userId ,{$push : {roles : roleId}} )
   }catch (e : any){
    throw new Error(e)
   }
}

export const userRemoveRole = async (userId : userDocument['_id'] , roleId : userDocument['_id']) => {
    try {
     return await userModel.findByIdAndUpdate( userId ,{$pull : {roles : roleId}} )
    }catch (e : any){
     throw new Error(e)
    }
 }

 export const userAddPermit = async (userId : userDocument['_id'] , permitId : userDocument['_id']) => {
    try {
     return await userModel.findByIdAndUpdate( userId ,{$push : {permits : permitId}} )
    }catch (e : any){
     throw new Error(e)
    }
 }

 export const userRemovePermit = async (userId : userDocument['_id'] , permitId : userDocument['_id']) => {
    try {
     return await userModel.findByIdAndUpdate( userId ,{$pull : {permits : permitId}} )
    }catch (e : any){
     throw new Error(e)
    }
 }