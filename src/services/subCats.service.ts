import subCatsModel ,{subCatsDocument} from "../models/subCats.model"
import catsModel from "../models/category.model"

export const addSubCats = async (payload : subCatsDocument ) =>{
   let check =  await subCatsModel.findOne ({name : payload.name})

   if(check) {
       throw new Error('Category name already exist')
   }

   let checkCats = await catsModel.findById(payload.catId)  
//    console.log(payload.catId , checkCats)
   if(!checkCats){
     throw  new Error("there is no id with that id")
   }
    let result = await new subCatsModel(payload).save()

    await catsModel.findByIdAndUpdate(checkCats._id ,{$push :{subcats : result._id}})
    
    return await subCatsModel.findById(result._id) 
}

export const getAllSubCats = async () =>{
     return await subCatsModel.find().populate("childcats")
}

export const getOneSubCats = async (id : subCatsDocument['_id']) =>{
    return await subCatsModel.findById(id)

}

export const dropSubCats = async (id : subCatsDocument['_id']) =>{
    // return await subCatsModel.findByIdAndDelete(id)
    const subCats = await subCatsModel.findById(id)
    if(!subCats){
        throw new Error("there is no subCat with that id")
    }

    await catsModel.findByIdAndUpdate(subCats.catId , {$pull : {subcats : subCats._id}})
    await subCatsModel.findByIdAndDelete(subCats._id)
    return;
}

export const updateSubCats = async (id : subCatsDocument['_id'] , payload : subCatsDocument) =>{

    let subCats = await subCatsModel.findById(id)
    
    if(!subCats) {
        throw new Error("No cats with that id")
    }

     await subCatsModel.findByIdAndUpdate( id , payload)
     return await subCatsModel.findById(id)
}