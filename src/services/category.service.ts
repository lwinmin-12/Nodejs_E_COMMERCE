import categoryModel ,{categoryDocument} from "../models/category.model"

export const addCategory = async (payload : categoryDocument ) =>{
   let check =  await categoryModel.findOne ({name : payload.name})

   if(check) {
       throw new Error('Category name already exist')
       return;
   }
   
   return await new categoryModel(payload).save()

}

export const getAllCats = async () =>{
     return await categoryModel.find().populate({
        path : "subcats",
        populate:{
            path : "childcats",
            model :"childcat"
        }
     })
}

export const getOneCats = async (id : categoryDocument['_id']) =>{
    return await categoryModel.findById(id)
}

export const dropCats = async (id : categoryDocument['_id']) =>{
    return await categoryModel.findByIdAndDelete(id)
}
export const updateCats = async (id : categoryDocument['_id'] , payload : categoryDocument) =>{

    let cats = await categoryModel.findById(id)
    
    if(!cats) {
        throw new Error("No cats with that id")
    }

     await categoryModel.findByIdAndUpdate( id , payload)
     return await categoryModel.findById(id)
}