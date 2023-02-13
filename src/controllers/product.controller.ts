import {Request , Response , NextFunction} from 'express'
import fMsg from '../utils/helper'
import { addProduct , getOneProduct , getAllProduct , dropProduct , productFilterBy , updateProduct , productPaginate} from '../services/product.service'

export const addProductHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await addProduct(req.body)
      fMsg(res , "Product saved" , result)
    }catch(e: any){
        return next(new Error(e.message))
    }
}

export const getAllProductHandler = async (req : Request , res : Response , next : NextFunction) =>{
      try{
        let result = await getAllProduct()
        fMsg(res , "all Product are here" , result)
      }catch (e : any){
        next(new Error(e.message))
      }
}

export const getOneProductHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
      let result = await getOneProduct(req.params.id)
      fMsg(res , "Product by id" , result)
    }catch (e : any){
      next(new Error(e.message))
    }
}

export const dropProductHandler = async (req : Request , res : Response , next : NextFunction) =>{
    try{
       await dropProduct(req.params.id)
      fMsg(res , "Product deleted" )
    }catch (e : any){
      next(new Error(e.message))
    }
}

export const updateProductHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
       let result =     await updateProduct(req.params.id , req.body)
      fMsg(res , "Product updated" , result )
    }catch (e : any){
      next(new Error(e))
    }

}

export const productPaginateHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let pageNo = Number(req.params.page)
  try{
    let result = await productPaginate(pageNo)
    fMsg(res , "all Product are here" , result)
  }catch (e : any){
    next(new Error(e.message))
  }
}

export const productFilterByHandler = async (req : Request , res : Response , next : NextFunction) =>{
  let id = req.params.id
  let pageNo = Number(req.params.page)
  let type : string = req.params.type
  
  try{
    let result = await productFilterBy(id , pageNo , type)
    fMsg(res , "filtered product" , result)
  }catch (e : any){
    next(new Error(e.message))
  }
}