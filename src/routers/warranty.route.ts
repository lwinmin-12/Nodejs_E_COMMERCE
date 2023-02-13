import { saveImg } from "../utils/gallary"
import { addWarrantyHandler , getAllWarrantyHandler , getOneWarrantyHandler , dropWarrantyHandler , updateWarrantyHandler } from "../controllers/warranty.controller"
const warrantyRoute = require('express').Router()


 warrantyRoute.post ("/" , saveImg ,addWarrantyHandler)

 warrantyRoute.get ("/"  , getAllWarrantyHandler)

 warrantyRoute.get("/:id" , getOneWarrantyHandler )

 warrantyRoute.delete("/:id" , dropWarrantyHandler)
 
 warrantyRoute.patch("/:id", saveImg , updateWarrantyHandler)

export default warrantyRoute