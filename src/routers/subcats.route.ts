import { addSubCatsHandler, dropSubCatsHandler, getAllSubCatsHandler, getOneSubCatsHandler, updateSubCatsHandler } from "../controllers/subCats.controller"
import { saveImg } from "../utils/gallary"
const subcatsRotue = require('express').Router()


 subcatsRotue.post ("/" , saveImg ,addSubCatsHandler)

 subcatsRotue.get ("/"  , getAllSubCatsHandler)

 subcatsRotue.get("/:id" , getOneSubCatsHandler )

 subcatsRotue.delete("/:id" , dropSubCatsHandler)
 
 subcatsRotue.patch("/:id", saveImg , updateSubCatsHandler)

export default subcatsRotue