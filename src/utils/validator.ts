import { NextFunction , Response , Request } from "express";
import {AnySchema} from "yup"
import { checkToken, get } from "./helper";
import config from 'config'
import jwt from "jsonwebtoken";
import { roleDocument } from "../models/role.model";
import { permitDocument } from "../models/permit.model";


export const validateBody = (schema : AnySchema) => (req : Request , res :Response , next : NextFunction) =>{
    try{
        // console.log(schema)
        schema.validate({ body :req.body});
    }catch(e :any){
       return next(new Error(e))
    }
     next()
}


export const validateAll =
   (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
     return next()
    } catch (e: any) {
      return next(new Error(e.errors))
    }
  };

  export const validateToken = () => async (req: Request, res: Response, next: NextFunction) =>{
     let token =  req.headers.authorization?.split(' ')[1]
    
     if(!token){
      return next(new Error("invalid token"))
     }

    try{

    let decoded =  checkToken(token)
    let user = await get(decoded._id)
    if(!user){
      return next(new Error("invalid token"))
    }
    req.body.user = user

     }catch (e: any){
     
      return next(new Error(e))
     }
     next()
  }

  export const validateRole = (role : string) => async (req: Request, res: Response, next: NextFunction) => {
     let foundRole = req.body.user.roles.find( (ea : roleDocument) => ea.name == role)
     if(!foundRole){
      return next(new Error ('You dont have this permission'))
     }
     next()
  }

  export const hasAnyRole = (roles : string[]) => (req: Request, res: Response, next: NextFunction) =>{
     let bol : boolean = false
     for (let i = 0; i < roles.length; i++) {
      let hasRole = req.body.user.roles.find((ea : roleDocument) => ea.name == roles[i])
      if(hasRole){
        bol = true ;
        break;
      }
     }
     if(!bol) return next(new Error("You have enough role"))
     next()
  }

  export const hasAnyPermit = (permits : string[]) => (req: Request, res: Response, next: NextFunction) =>{
    let bol : boolean = false
    // console.log(typeof(req.body.user.permits))
    // req.body.user.permits.map((ea:any ) => console.log(ea))
    for (let i = 0; i < permits.length; i++) {
     let hasPermit = req.body.user.permits.find((ea : permitDocument) => ea.name == permits[i])
     if(hasPermit){
       bol = true ;
       break;
     }
    }
    if(!bol) return next(new Error("You have not that permit"))
    next()
 }