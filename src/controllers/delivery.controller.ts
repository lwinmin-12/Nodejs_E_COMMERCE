import {Request , Response , NextFunction} from 'express'
import fMsg from '../utils/helper'
import {addDelivery , getAllDelivery , getOneDelivery , dropDelivery , updateDelivery} from "../services/delivery.service"
 

export const addDeliveryHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addDelivery(req.body)
      fMsg(res , "Delivery saved" , result)
    }catch(e: any){
        return next(new Error(e))
    }
}

export const getAllDeliveryHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllDelivery()
        fMsg(res , "all Delivery are here" , result)
      }catch (e : any){
        next(new Error(e))
      }
}

export const getOneDeliveryHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneDelivery(req.params.id)
      fMsg(res , "Delivery by id" , result)
    }catch (e : any){
      next(new Error(e))
    }
}

export const dropDeliveryHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropDelivery(req.params.id)
      fMsg(res , "Delivery deleted" )
    }catch (e : any){
      next(new Error(e))
    }
}

export const updateDeliveryHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result = await updateDelivery(req.params.id , req.body)
      fMsg(res , "Delivery updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}