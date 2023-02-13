import {Response} from 'express'
import bcrypt from 'bcrypt'
import { userDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from 'config'

const Redis = require('async-redis').createClient();
const secretKey = config.get<string>('secretKey')

export const set = async (id : userDocument["_id"] ,  value : {} ) => await Redis.set(id.toString(),JSON.stringify(value));

export const get = async (id : any) => JSON.parse(await Redis.get(id.toString()));

export const drop = async (id : any) => await Redis.del(id.toString())

// export const pop = async (id : string) =>await Redis.get(id.toString())

export const createToken = (payload : {}) => jwt.sign(payload , secretKey , {expiresIn : '1h'})

export const checkToken = (payload : string) : any => jwt.verify( payload , secretKey )

export const encode =  (payload : string , salt : string ) =>  bcrypt.hashSync(payload , salt )

export const compass =  (payload : string , dbPass : string) =>  bcrypt.compareSync(payload , dbPass)

const fMsg = (res : Response , msg : string ='all success' , result : any =[] ) =>{
  res.status(200).json({con:true , msg , result})
}

export default fMsg 