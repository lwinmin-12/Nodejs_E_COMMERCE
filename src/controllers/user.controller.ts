import {Request , Response , NextFunction} from 'express'
import {   userAddPermit, userAddRole, userRegister, userRemovePermit, userRemoveRole ,  } from '../services/user.service'
import fMsg , {createToken, set} from '../utils/helper'
import userModel from '../models/user.model'
import roleModel , {roleDocument} from "../models/role.model"
import permitModel, { permitDocument } from "../models/permit.model"
import { compass } from '../utils/helper'

 export const getAllUserHandler = async (req : Request , res : Response , next : NextFunction) => {
   let result = await userModel.find().populate('roles permits')
   fMsg(res , "all user" , result)
 }


export const userRegisterHandler = async (req : Request , res : Response , next : NextFunction) =>{
      
  let emailUser =  await userModel.findOne({email : req.body.email})
  if(emailUser){
   return next(new Error('email already exist'))
  }

  let phoneUser = await userModel.findOne({phone : req.body.password})
   if(phoneUser){
    return next(new Error('phone already exist'))
   }

   try{
    let result = await userRegister(req.body)
   fMsg(res , 'registered' , result)
   }catch(e :any){
    return next(new Error (e.errors))
   }
}

export const userLoginHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let user = await userModel.findOne({phone : req.body.phone}).populate('roles permits').select("-__v")

  if(!user || !compass(req.body.password , user.password )){
    return next(new Error("Creditial Error"))
  }
  let userObj = user.toObject()
  userObj.token =  createToken(userObj)
  delete userObj.password;
  set(user._id , userObj)
  fMsg(res , "login successful" , userObj)
  
}
 
export const userAddRoleHandler = async (req : Request , res : Response , next : NextFunction) =>{
        let user = await userModel.findById(req.body.userId)
        let role = await roleModel.findById(req.body.roleId)
        
      
        if(!user || !role) {
          return next( new Error("there is no role or user"))
        }

        let foundRole = user.roles.find(( ea : roleDocument) => ea.equals(role?._id))
        if(foundRole) {
         return next(new Error("role already exist"))
        }
        try{

        await userAddRole(user._id , role._id)
        let result = await userModel.findById(user._id)
        fMsg(res , 'role added' , result)

        }catch(e:any){
          next(new Error(e.errors))
        }
}

export const userRemoveRoleHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let user = await userModel.findById(req.body.userId)
  if(!user ) {
    return next( new Error("there is no user"))
  }

  let foundRole = user.roles.find(( ea : roleDocument) => ea.equals(req.body.roleId))
  if(!foundRole) {
   return next(new Error("role not exist"))
  }
  try{
    await userRemoveRole(user._id , req.body.roleId)
    let result = await userModel.findById(user._id)
    fMsg(res , 'role removed' , result)
  }catch(e:any){
    next(new Error(e.errors))
  }
}

export const userAddPermitHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let user = await userModel.findById(req.body.userId)
  let permit = await permitModel.findById(req.body.permitId)
  
  // console.log(typeof(user?.permits))
   
  if(!user || !permit) {
    return next( new Error("there is no permit or user"))
  }

  let foundPermit = user.permits.find(( ea : permitDocument) => ea.equals(permit?._id))
  if(foundPermit) {
   return next(new Error("permit already exist"))
  }
  try{

  await userAddPermit(user._id , permit._id)
  let result = await userModel.findById(user._id)
  fMsg(res , 'permit added' , result)

  }catch(e:any){
    next(new Error(e.errors))
  }
}

export const userRemovePermitHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let user = await userModel.findById(req.body.userId)
  if(!user ) {
    return next( new Error("there is no user"))
  }

  let foundPermit = user.permits.find(( ea : permitDocument) => ea.equals(req.body.permitId))
  if(!foundPermit) {
   return next(new Error("premit not exist"))
  }
  try{
    await userRemovePermit(user._id , req.body.permitId)
    let result = await userModel.findById(user._id)
    fMsg(res , 'role removed' , result)
  }catch(e:any){
    next(new Error(e.errors))
  }
}