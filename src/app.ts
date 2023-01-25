import express ,{NextFunction , Request , Response } from "express";
import mongoose from "mongoose";
import config from "config"
import permitRouter from "./routers/permit.route";
import roleRoute from "./routers/role.route";
import { addOwnerRole, backup, migrate, rp } from "./migrations/migrator";
import userRoute from "./routers/user.route";
import { hasAnyPermit, hasAnyRole, validateToken } from "./utils/validator";

const app  = express()
const port = config.get<number>('port')
const host = config.get<string>("host")
const dbUrl = config.get<string>('dbUrl')


 app.use(express.json())
 mongoose.connect(dbUrl)

 app.use("/permits" , validateToken(),hasAnyPermit(["Create_Category","Edit_Category","Delete_Category"]),permitRouter)
 app.use("/roles" , validateToken() , hasAnyRole(["Owner" , "Manager" ,"Supervisor"]) , roleRoute)
app.use('/users' , userRoute)

app.use((err :any , req :Request , res :Response , next :NextFunction) => {
      // console.error(err.errors)
      err.status = err.status || 200;
      res.status(err.status).json({
        con: false,
        msg: err.message,
      });
})

const defaultData = async ()=>{
  await migrate()
  await rp()
  await addOwnerRole()
}

// defaultData()

app.listen(port, ()=> console.log(`server is running in http://${host}:${port}`))