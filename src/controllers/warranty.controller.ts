import {Request , Response , NextFunction} from 'express'
import fMsg from '../utils/helper'
import { addWarranty , getAllWarranty , getOneWarranty ,dropWarranty , updateWarranty } from '../services/warranty.service'

export const addWarrantyHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addWarranty(req.body)
      fMsg(res , "Warranty saved" , result)
    }catch(e: any){
        return next(new Error(e.message))
    }
}

export const getAllWarrantyHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllWarranty()
        fMsg(res , "all Warranty are here" , result)
      }catch (e : any){
        next(new Error(e.message))
      }
}

export const getOneWarrantyHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneWarranty(req.params.id)
      fMsg(res , "Warranty by id" , result)
    }catch (e : any){
      next(new Error(e.errors))
    }
}

export const dropWarrantyHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropWarranty(req.params.id)
      fMsg(res , "Warranty deleted" )
    }catch (e : any){
      next(new Error(e.errors))
    }
}

export const updateWarrantyHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result =     await updateWarranty(req.params.id , req.body)
      fMsg(res , "Warranty updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}