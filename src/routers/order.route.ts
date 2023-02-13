import { addOrderHandler, getOrderHandler } from "../controllers/order.controller"
import { validateAll , validateToken } from "../utils/validator"
const orderRoute = require('express').Router()

orderRoute.post('/' ,validateToken() ,addOrderHandler)

orderRoute.get('/' ,validateToken() ,getOrderHandler)


export default orderRoute