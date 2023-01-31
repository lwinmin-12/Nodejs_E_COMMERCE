import { addDeliveryHandler, dropDeliveryHandler, getAllDeliveryHandler, getOneDeliveryHandler, updateDeliveryHandler } from "../controllers/delivery.controller"
import {saveImg} from "../utils/gallary"
const deliveryRoute = require("express").Router()


deliveryRoute.post("/" ,saveImg , addDeliveryHandler)

deliveryRoute.get("/" , getAllDeliveryHandler )

deliveryRoute.get("/:id" , getOneDeliveryHandler)

deliveryRoute.post("/:id" , updateDeliveryHandler)

deliveryRoute.delete("/:id" , dropDeliveryHandler)

deliveryRoute.patch("/:id" , updateDeliveryHandler)



export default deliveryRoute