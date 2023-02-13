import warrantyModel , {warrantyDocumnent} from '../models/warranty.model'

export const addWarranty = async (payload : warrantyDocumnent ) =>{
   let check =  await warrantyModel.findOne ({name : payload.name})

   if(check) {
       throw new Error('warranty name already exist')
   }
   payload.remark = payload.remark.split(',')

   return await new warrantyModel(payload).save()

}

export const getAllWarranty = async () =>{
     return await warrantyModel.find()
}

export const getOneWarranty = async (id : warrantyDocumnent['_id']) =>{
    return await warrantyModel.findById(id)
}

export const dropWarranty = async (id : warrantyDocumnent['_id']) =>{
    return await warrantyModel.findByIdAndDelete(id)
}
export const updateWarranty = async (id : warrantyDocumnent['_id'] , payload : warrantyDocumnent) =>{

    let Warranty = await warrantyModel.findById(id)
    
    if(!Warranty) {
        throw new Error("No Warranty with that id")
    }

     await warrantyModel.findByIdAndUpdate( id , payload)
     return await warrantyModel.findById(id)
}