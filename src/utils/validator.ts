import { NextFunction , Response , Request } from "express";
import {AnySchema} from "yup"

export const validateBody = (schema : AnySchema) => (req : Request , res :Response , next : NextFunction) =>{
    try{
        // console.log(schema)
        schema.validate({ body :req.body});
    }catch(e :any){
        // console.log(e)
       return next(new Error(e))
    }
     next()
}

// export const validateParams = (schema   , name) => (req : Request , res :Response , next : NextFunction) =>{
//     let obj = {}
//     obj[`${name}`] = req.params[`${name}`];
//     try{
//      let result = schema.validate(obj);
//     }catch(e:any){
//         return next(new Error("id is not valid"))
//     }
//     next();
// }

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
      return next(new Error("invalid id"))
    }
  };