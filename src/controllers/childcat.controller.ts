import {Request , Response , NextFunction} from 'express'
import { addChildCats, dropChildCats, getAllChildCats, getOneChildCats, updateChildCats } from '../services/childcat.service'
import fMsg from '../utils/helper'
 

export const addChildCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addChildCats(req.body)
      fMsg(res , "category saved" , result)
    }catch(e: any){
        return next(new Error(e))
    }
}

export const getAllChildCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllChildCats()
        fMsg(res , "all cats are here" , result)
      }catch (e : any){
        next(new Error(e))
      }
}

export const getOneChildCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneChildCats(req.params.id)
      fMsg(res , "cats by id" , result)
    }catch (e : any){
      next(new Error(e))
    }
}

export const dropChildCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropChildCats(req.params.id)
      fMsg(res , "Childcategory deleted" )
    }catch (e : any){
      next(new Error(e))
    }
}

export const updateChildCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result =     await updateChildCats(req.params.id , req.body)
      fMsg(res , "category updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}