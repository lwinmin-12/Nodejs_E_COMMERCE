import fMsg from "../utils/helper";
import { encode } from "../utils/helper";
import fs from 'fs'
import config from 'config'
import bcrypt from 'bcrypt'
import { addNewUser } from "../services/user.service";
import userModel, { userDocument } from "../models/user.model"





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