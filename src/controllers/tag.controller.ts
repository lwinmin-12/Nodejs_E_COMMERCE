import {Request , Response , NextFunction} from 'express'
import fMsg from '../utils/helper'
import {addTag , getAllTag , getOneTag , dropTag , updateTag} from "../services/tag.service"
 

export const addTagHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addTag(req.body)
      fMsg(res , "Tag saved" , result)
    }catch(e: any){
        return next(new Error(e))
    }
}

export const getAllTagHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllTag()
        fMsg(res , "all Tag are here" , result)
      }catch (e : any){
        next(new Error(e))
      }
}

export const getOneTagHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneTag(req.params.id)
      fMsg(res , "Tag by id" , result)
    }catch (e : any){
      next(new Error(e))
    }
}

export const dropTagHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropTag(req.params.id)
      fMsg(res , "Tag deleted" )
    }catch (e : any){
      next(new Error(e))
    }
}

export const updateTagHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result = await updateTag(req.params.id , req.body)
      fMsg(res , "Tag updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}