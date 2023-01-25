const userRoute = require('express').Router()
import {validateAll, validateRole, validateToken} from "../utils/validator"
import {userRegisterSchema , userLoginSchema , userAddRoleSchema, userAddPermitSchema} from "../utils/schema"
import { 
    userRegisterHandler ,
    userLoginHandler ,
    userAddRoleHandler, 
    getAllUserHandler, 
    userRemoveRoleHandler,
    userAddPermitHandler,
    userRemovePermitHandler
     } from "../controllers/user.controller"

userRoute.get("/" , getAllUserHandler)

userRoute.post("/register" ,validateAll(userRegisterSchema) , userRegisterHandler)

userRoute.post("/login" , validateAll(userLoginSchema) ,userLoginHandler)

userRoute .post("/add/role", validateToken(), validateRole("Owner") ,validateAll(userAddRoleSchema)  , userAddRoleHandler)

userRoute .post("/remove/role", validateToken(), validateRole("Owner") ,validateAll(userAddRoleSchema)  , userRemoveRoleHandler)

userRoute .post("/add/permit", validateToken(), validateRole("Owner") ,validateAll(userAddPermitSchema)  , userAddPermitHandler)

userRoute .post("/remove/permit", validateToken(), validateRole("Owner") ,validateAll(userAddPermitSchema)  , userRemovePermitHandler)




export default userRoute