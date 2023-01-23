import userModel, { userDocument } from "../models/user.model"

export const addNewUser = async ( payload : userDocument ) => {
    
    // console.log(payload.name)
    let user = await userModel.findOne({name  : payload.name})
    if(user){
        console.log('user already exist')
        return 'user already exist'
    }
    try{
        return await new userModel(payload).save()
    }catch (e : any) {
        return new Error (e)
    }
    
}