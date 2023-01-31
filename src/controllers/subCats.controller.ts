import {Request , Response , NextFunction} from 'express'
import { getAllSubCats, addSubCats, getOneSubCats, dropSubCats, updateSubCats } from '../services/subCats.service'
import fMsg from '../utils/helper'
 

export const addSubCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addSubCats(req.body)
      fMsg(res , "category saved" , result)
    }catch(e: any){
        return next(new Error(e))
    }
}

export const getAllSubCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllSubCats()
        fMsg(res , "all cats are here" , result)
      }catch (e : any){
        next(new Error(e))
      }
}

export const getOneSubCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneSubCats(req.params.id)
      fMsg(res , "cats by id" , result)
    }catch (e : any){
      next(new Error(e))
    }
}

export const dropSubCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropSubCats(req.params.id)
      fMsg(res , "Subcategory deleted" )
    }catch (e : any){
      next(new Error(e))
    }
}

export const updateSubCatsHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result =     await updateSubCats(req.params.id , req.body)
      fMsg(res , "category updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}