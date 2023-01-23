const permitRoute = require('express').Router()
import {addPermitHandler, getAllHandler , getOneHandler , updateHandler , dropHandler} from '../controllers/permit.controller'
import {validateAll} from "../utils/validator"
import {permitSchema , allSchema} from "../utils/schema"

// console.log(permitSchema)
permitRoute.post("/" , validateAll(permitSchema) , addPermitHandler)

permitRoute.get('/' , getAllHandler)

permitRoute.get("/:id" ,validateAll(allSchema) ,getOneHandler)

permitRoute.post("/:id" ,validateAll(allSchema) , updateHandler)

permitRoute.delete("/:id" ,validateAll(allSchema) , dropHandler)


export default permitRoute