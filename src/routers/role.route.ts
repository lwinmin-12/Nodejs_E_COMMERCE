const roleRoute = require('express').Router()
import {validateAll} from "../utils/validator"
import {permitSchema , allSchema, roleAddPermitSchema} from "../utils/schema"
import { addRoleHandler , dropHandler, getAllHandler , getOneHandler, roleAddPermitHandler, roleRemovePermitHandler, updateHandler} from "../controllers/role.controller"

roleRoute.post("/" , validateAll(permitSchema)  , addRoleHandler)

roleRoute.get("/" , getAllHandler )

roleRoute.get("/:id" ,validateAll(allSchema), getOneHandler)

roleRoute.post("/:id" ,validateAll(allSchema), updateHandler)

roleRoute.delete("/:id" ,validateAll(allSchema), dropHandler)

roleRoute.post("/add/permits" , validateAll(roleAddPermitSchema) ,roleAddPermitHandler)

roleRoute.post("/remove/permits" , validateAll(roleAddPermitSchema) ,roleRemovePermitHandler)



export default roleRoute