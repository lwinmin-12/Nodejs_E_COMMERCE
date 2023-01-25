import fMsg from "../utils/helper";
import { encode } from "../utils/helper";
import fs from 'fs'
import config from 'config'
import bcrypt from 'bcrypt'
import { addNewUser } from "../services/user.service";
import userModel, { userDocument } from "../models/user.model"
import roleModel , { roleDocument } from "../models/role.model";
import { addRole } from "../services/role.service";
import { addPermit } from "../services/permit.service";
import { permitDocument } from "../models/permit.model";





export const migrate = async ()=>{
    let data : any = fs.readFileSync('./src/migrations/user.json')
    let users = JSON.parse(data)
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    users.forEach( async (ea : userDocument ) => {
        ea.password  = await encode(ea.password , salt)
        let result = await addNewUser(ea)
        // fMsg( res , 'user saved ' , result)
        console.log(result)
    });
}

export const backup = async () =>{
    let users  = await userModel.find();
    fs.writeFileSync("./src/migrations/backup/backup.json" , JSON.stringify(users))
    console.log("data backuped")
}

export const rp  = async ()=>{
    let data : any = fs.readFileSync("./src/migrations/rolePermit.json")
    let rp = JSON.parse(data)
    rp.roles.forEach( async (ea : roleDocument ) => {
        try{
            let result = await addRole(ea)
          console.log(result)
        }catch(e : any){
           console.log(e)
        }
        
    });
    rp.permits.forEach( async (ea : permitDocument ) => {
        try{
            let result = await addPermit(ea)
            console.log(result)
        }catch(e : any){
            console.log(e)
        }
    });
}

export const addOwnerRole = async () =>{
    let ownerUser  = await userModel.findOne({phone : "09500500500"})
    if(!ownerUser){
        return "owner not defind"
    }
    let ownerRole = await roleModel.findOne({name : "Owner"})
    if(!ownerRole){
        return "owner not found"
    }
   let result = await userModel.findByIdAndUpdate(ownerUser._id , {$push :{roles : ownerRole._id}})
   console.log(result)
}