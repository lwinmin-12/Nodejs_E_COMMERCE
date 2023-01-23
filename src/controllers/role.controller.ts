import {Request ,Response , NextFunction} from 'express'
import fMsg from '../utils/helper'
import { addRole , dropRole, updateRole , roleAddPermit, roleRemovePermit} from '../services/role.service'
import DB from "../models/role.model"
import permitDB from "../models/permit.model"

export const addRoleHandler = async (req : Request , res : Response , next : NextFunction) =>{
    let role = await DB.findOne({name : req.body.name})
    // console.log(role)
    if(role) {
        next(new Error("role already exist"))
        return
    }
    let result = await addRole(req.body)
    fMsg(res , "New role added" , result)
}

export const getAllHandler = async (req : Request , res : Response , next : NextFunction) => {
    let result = await DB.find().populate('permits').select("-__v")
    fMsg(res , "New role added" , result)
}

export const getOneHandler = async (req : Request , res : Response , next : NextFunction) =>{
    let result = await DB.findById(req.params.id).populate('permits').select("-__v")
    fMsg(res , 'role' , result)
}

export const updateHandler = async (req : Request , res : Response , next : NextFunction) =>{
    let role = await DB.findById(req.params.id).select("-__v")

    if(!role){
        next(new Error("Role not exist with that id"))
        return
    } 

   let result = await updateRole( role._id , req.body )
   fMsg(res , "Updated role " , result)
}

export const dropHandler = async(req : Request , res : Response , next:NextFunction) =>{
    let dbRole = await DB.findById(req.params.id)
    if(!dbRole){
        next(new Error("role not found"))
        return 
    }
    let result =await dropRole(dbRole._id)
    fMsg(res , "role deleted")
}

export const roleAddPermitHandler = async (req : Request , res : Response , next:NextFunction) =>{
     let roleId = req.body.roleId
     let permitId = req.body.permitId

     let dbRole = await DB.findById(roleId)
     let dbPermit = await permitDB.findById(permitId)
    
     if(dbRole && dbPermit) {
        await roleAddPermit(dbRole._id , dbPermit._id)
        let result = await DB.findById(roleId)
        fMsg(res , 'permit added' , result)
     }else{
        next(new Error("role and permit id need to be valid"))
     }
   
}

export const roleRemovePermitHandler = async (req : Request , res : Response , next:NextFunction) =>{
    let roleId = req.body.roleId
    let permitId = req.body.permitId

    let dbRole = await DB.findById(roleId)
    let dbPermit = await permitDB.findById(permitId)
   
    if(dbRole && dbPermit) {
       await roleRemovePermit(dbRole._id , dbPermit._id)
       let result = await DB.findById(roleId)
       fMsg(res , 'permit removed' , result)
    }else{
       next(new Error("role and permit id need to be valid"))
    }
}