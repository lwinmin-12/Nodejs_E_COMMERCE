import { FilterQuery } from 'mongoose'
import roleDB, { roleDocument } from '../models/role.model'
import permitDB ,{permitDocument} from "../models/permit.model"

export const addRole =async (name : roleDocument) => {
    try{
        return await new roleDB(name).save()
    }catch (e:any) {
      throw new Error(e);

    }
}

export const updateRole = async (income  : FilterQuery<roleDocument> , value : roleDocument) => {
    try{
       await roleDB.findByIdAndUpdate(income  , value)
       return roleDB.findById(income)
    }catch(e : any) {
      throw new Error(e);
      }
}

export const dropRole = async  (income : FilterQuery<roleDocument> ) =>{
    try{
        await roleDB.findByIdAndDelete(income)
    }catch(e : any) {
         throw new Error(e);
    }
}

export const roleAddPermit = async (roleId : roleDocument['_id'], permitId : permitDocument["_id"]) =>{
    try{
        return await roleDB.findByIdAndUpdate(roleId , {$push :{permits : permitId}})
    }catch (e :any){
         throw new Error(e);
    }
}

export const roleRemovePermit = async (roleId : roleDocument['_id'], permitId : permitDocument["_id"]) =>{
    try{
        return await roleDB.findByIdAndUpdate(roleId , {$pull :{permits : permitId}})
    }catch (e :any){
         throw new Error(e);
    }
}