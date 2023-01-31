import tagModel, { tagDocument } from "../models/tag.model"

export const addTag = async (payload : tagDocument) =>{
    let check =  await tagModel.findOne ({name : payload.name})

    if(check) {
        throw new Error('Tag name already exist')
        return;
    }
    
    return await new tagModel(payload).save()
 
} 

export const getAllTag= async () =>{
    return await tagModel.find()
}

export const getOneTag= async (id : tagDocument['_id']) =>{
   return await tagModel.findById(id)
}

export const dropTag= async (id : tagDocument['_id']) =>{
   return await tagModel.findByIdAndDelete(id)
}
export const updateTag= async (id : tagDocument['_id'] , payload : tagDocument) =>{

   let checkTag= await tagModel.findById(id)
   
   if(!checkTag) {
       throw new Error("No Tagwith that id")
   }

    await tagModel.findByIdAndUpdate( id , payload)
    return await tagModel.findById(id)
}