const childcatRoute = require("express").Router()

import { addChildCatsHandler, dropChildCatsHandler, getAllChildCatsHandler, getOneChildCatsHandler, updateChildCatsHandler } from "../controllers/childcat.controller"
import { saveImg } from "../utils/gallary"


 childcatRoute.post ("/" , saveImg ,addChildCatsHandler)

 childcatRoute.get ("/"  , getAllChildCatsHandler)

 childcatRoute.get("/:id" , getOneChildCatsHandler )

 childcatRoute.delete("/:id" , dropChildCatsHandler)
 
 childcatRoute.patch("/:id", saveImg , updateChildCatsHandler)

export default childcatRoute