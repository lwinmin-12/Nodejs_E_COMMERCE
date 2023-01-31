import deliveryModel,{ deliveryDocument } from "../models/delivery.model";

export const addDelivery = async (payload : deliveryDocument) =>{
    let check =  await deliveryModel.findOne ({name : payload.name})

    if(check) {
        throw new Error('Delivery name already exist')
    }
    
    payload.remark = payload.remark.split(',')
    return await new deliveryModel(payload).save()

} 

export const getAllDelivery= async () =>{
    return await deliveryModel.find()
}

export const getOneDelivery= async (id : deliveryDocument['_id']) =>{
   return await deliveryModel.findById(id)
}

export const dropDelivery= async (id : deliveryDocument['_id']) =>{
   return await deliveryModel.findByIdAndDelete(id)
}
export const updateDelivery= async (id : deliveryDocument['_id'] , payload : deliveryDocument) =>{

   let checkDelivery= await deliveryModel.findById(id)
   
   if(!checkDelivery) {
       throw new Error("No Delivery with that id")
   }

    await deliveryModel.findByIdAndUpdate( id , payload)
    return await deliveryModel.findById(id)
}