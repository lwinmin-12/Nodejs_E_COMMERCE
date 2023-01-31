import express ,{NextFunction , Request , Response } from "express";
import mongoose from "mongoose";
import config from "config"
import permitRouter from "./routers/permit.route";
import roleRoute from "./routers/role.route";
import { addOwnerRole, backup, migrate, rp } from "./migrations/migrator";
import userRoute from "./routers/user.route";
import { hasAnyPermit, hasAnyRole, validateRole, validateToken } from "./utils/validator";
import categoryRoute from "./routers/category.route";
import fileUpload from "express-fileupload";
import subcatsRotue from "./routers/subcats.route";
import childcatRoute from "./routers/childcat.route";
import tagRoute from "./routers/tag.route";
import deliveryRoute from "./routers/delivery.route";

const app  = express()
const port = config.get<number>('port')
const host = config.get<string>("host")
const dbUrl = config.get<string>('dbUrl')


 app.use(express.json())
 app.use(fileUpload())
 mongoose.connect(dbUrl)

 app.use("/permits" , validateToken(),permitRouter)
 app.use("/roles" , validateToken() , validateRole("Owner") , roleRoute)
 app.use('/users' , userRoute)
 app.use("/cats" , categoryRoute)
 app.use("/subcats" , subcatsRotue)
 app.use("/childcats" , childcatRoute)
 app.use("/tags" , tagRoute)
 app.use("/delivery" , deliveryRoute)

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