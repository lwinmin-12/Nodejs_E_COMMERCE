import childcatModel , { childecatDocument } from "../models/childCats.model"
import subcatModel from "../models/subCats.model"

export const addChildCats = async (payload : childecatDocument ) =>{
   let check =  await childcatModel.findOne ({name : payload.name})

   if(check) {
       throw new Error('Category name already exist')
   }

   let checksubCat = await subcatModel.findById(payload.subcatId)  
//    console.log(checksubCat)
   if(!checksubCat){
     throw  new Error("there is no id with that id")
   }
    let result = await new childcatModel(payload).save()

    await subcatModel.findByIdAndUpdate(checksubCat._id ,{$push :{childcats : result._id}})
    
    return await childcatModel.findById(result._id) 
}

export const getAllChildCats = async () =>{
     return await childcatModel.find()
}

export const getOneChildCats = async (id : childecatDocument['_id']) =>{
    return await childcatModel.findById(id)

}

export const dropChildCats = async (id : childecatDocument['_id']) =>{
    // return await childcatModel.findByIdAndDelete(id)
    const childCats = await childcatModel.findById(id)
    if(!childCats){
        throw new Error("there is no subCat with that id")
    }

    await subcatModel.findByIdAndUpdate(childCats.subcatId , {$pull : {childcats : childCats._id}})
    await childcatModel.findByIdAndDelete(childCats._id)
    return;
}

export const updateChildCats = async (id : childecatDocument['_id'] , payload : childecatDocument) =>{

    let childCats = await childcatModel.findById(id)
    
    if(!childCats) {
        throw new Error("No cats with that id")
    }

     await childcatModel.findByIdAndUpdate( id , payload)
     return await childcatModel.findById(id)
}