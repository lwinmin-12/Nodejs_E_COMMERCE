import {Response} from 'express'
import bcrypt from 'bcrypt'

// const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

export const encode = async (payload : string , salt : string ) => await bcrypt.hashSync(payload , salt )


const fMsg = (res : Response , msg : string ='all success' , result : any =[] ) =>{
  res.status(200).json({con:true , msg , result})
}

export default fMsg