import { NextFunction , Response ,Request } from "express";
import fs from "fs"


export const saveImg = (req : Request, res : Response, next : NextFunction) => {
  
  if(!req.files){
    return next(new Error ("file not exist"))
  }
  
  let file : any  = req.files.file;
  let fileName = new Date().valueOf() + "_" + file.name;
  file.mv(`./src/upload/${fileName}`);
  req.body['image'] = fileName
  next();
};  

export const saveImgs = (req : Request, res : Response, next : NextFunction) => {
  if(!req.files){
    return next(new Error ("file not exist"))
  }
  let fileNames : string[] = [];
  
  let files : any = req.files.files;

  files.forEach((ea : any) => {
    let fileName = new Date().valueOf() + "_" + ea.name;
    ea.mv(`./src/upload/${fileName}`);
    fileNames.push(fileName);
  });
  req.body["images"] = fileNames;
  next();
};
export const delImg = async (fileName : string) => {
  // let fileName = req.body.name;
  await fs.unlinkSync(`upload/${fileName}`);
  console.log(fileName);
};


