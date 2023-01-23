import permitDB from '../models/permit.model'
import {permitDocument} from '../models/permit.model'
import {Request ,Response , NextFunction} from 'express'
import { FilterQuery } from 'mongoose'

export const addPermit = async (name : permitDocument ) => {
    
    try{
        return await new permitDB(name).save()
    }catch (e) {
     return  new Error("New permit can't creat")
    }
}

export const updatePermit = async ( income :FilterQuery<permitDocument> , value : permitDocument) => {
    try{
        await permitDB.findByIdAndUpdate(income , value)
        return await permitDB.findById(income)
    }catch(e : any){
        return  new Error(" Error permit can't update")

    }
}

export const dropPermit = async  (income : FilterQuery<permitDocument> ) =>{
    try{
        await permitDB.findByIdAndDelete(income)
    }catch(e : any) {
        return new Error(" Error permit can't delete")
    }
}