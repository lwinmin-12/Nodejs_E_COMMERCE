import productModel , {permitDocument} from "../models/product.model"
import config from 'config'
import { categoryDocument } from "../models/category.model"
export const addProduct = async (payload : permitDocument ) =>{
   let check =  await productModel.findOne ({name : payload.name})

   if(check) {
       throw new Error('Product name already exist')
       return;
   }
   if( payload.features){
    payload.features = payload.features.split(",")

   }
   if( payload.delivery){
    payload.delivery = payload.delivery.split(",")

   }
   if( payload.warranty){
    payload.warranty = payload.warranty.split(",")

   }
   if( payload.colors){
    payload.colors = payload.colors.split(",")

   }
   return await new productModel(payload).save()

}

export const getAllProduct = async () =>{
     return await productModel.find()
}

export const getOneProduct = async (id : permitDocument['_id']) =>{
    return await productModel.findById(id)
}

export const dropProduct = async (id : permitDocument['_id']) =>{
    return await productModel.findByIdAndDelete(id)
}

export const updateProduct = async (id : permitDocument['_id'] , payload : permitDocument) =>{

    let Product = await productModel.findById(id)
    
    if(!Product) {
        throw new Error("No Product with that id")
    }

     await productModel.findByIdAndUpdate( id , payload)
     return await productModel.findById(id)
}

export const productPaginate = async (pageNo : number) =>{
    const limitNo = config.get<number>('page_limit')
    const reqPage = pageNo == 1 ? 0 : pageNo-1
    const skipCount = limitNo * reqPage;
    return await productModel.find().skip(skipCount).limit(limitNo)
}

export const productFilterBy = async (id : categoryDocument['_id'] , pageNo : number , type : string) =>{
    const limitNo = config.get<number>('page_limit')
    const reqPage = pageNo == 1 ? 0 : pageNo-1
    const skipCount = limitNo * reqPage;
   let filterObj : any = {}
   filterObj[`${type}`] = id
   console.log(filterObj)
    return await productModel.find(filterObj).skip(skipCount).limit(limitNo)
}