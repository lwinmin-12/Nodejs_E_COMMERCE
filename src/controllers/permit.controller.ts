import DB from '../models/permit.model'
import fMsg from '../utils/helper'
import {addPermit , dropPermit, updatePermit } from "../services/permit.service"
import {Request ,Response , NextFunction} from 'express'

export const addPermitHandler = async (req:Request , res:Response , next :NextFunction )=>{
    
    let dbPermit = await DB.findOne({name : req.body.name})
    if(dbPermit) {  
        next(new Error('Permission Name is already exists'))
    }else{
        let result = await addPermit(req.body)
        fMsg(res , "Permission Saves" , result  )
    }

}

export const getAllHandler = async (req:Request , res:Response , next :NextFunction ) =>{
   let result = await DB.find()
   fMsg(res , "all permission" , result)
} 

export const getOneHandler =async (req:Request , res:Response , next :NextFunction ) => {
    let result = await DB.findById(req.params.id)
    if(!result){
        console.log('here')
        next(new Error("user not found"))
        return 
    }
    fMsg(res , "get one permission by id" , result)
}


export const updateHandler = async (req : Request , res : Response , next:NextFunction) =>{
    let dbPermit = await DB.findById(req.params.id)
  
    if(!dbPermit){
        next(new Error("user not found"))
        return 
    }
    let result = await updatePermit(dbPermit._id , req.body)
    fMsg(res , 'permit updated' , result)
}

export const dropHandler = async(req : Request , res : Response , next:NextFunction) =>{
    let dbPermit = await DB.findById(req.params.id)
    if(!dbPermit){
        next(new Error("user not found"))
        return 
    }
    let result =await dropPermit(dbPermit._id)
    fMsg(res , "permit deleted")
}