import fMsg from '../utils/helper'
import {Request , Response , NextFunction} from 'express'
import {addOrder, getOrder} from '../services/order.service'

export const addOrderHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addOrder(req.body)
      fMsg(res , "Order saved" , result)
    }catch(e: any){
        return next(new Error(e.message))
    }
}

export const getOrderHandler = async (req : Request , res : Response , next : NextFunction) => {
  try{
    let result = await getOrder(req.body.user)
    fMsg(res , "Order saved" , result)
  }catch(e: any){
      return next(new Error(e.message))
  }

}