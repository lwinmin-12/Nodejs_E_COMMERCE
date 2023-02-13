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
import warrantyRoute from "./routers/warranty.route";
import productRoute from "./routers/product.route";
import orderRoute from "./routers/order.route";
import { checkToken ,get } from "./utils/helper";
import { initialize } from "./utils/chat";

const app  = express()
const port = config.get<number>('port')
const host = config.get<string>("host")
const dbUrl = config.get<string>('dbUrl')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

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
 app.use('/warranty' , warrantyRoute)
 app.use('/product' , productRoute)
 app.use('/orders' , orderRoute)

app.use((err :any , req :Request , res :Response , next :NextFunction) => {
      err.status = err.status || 200;
      res.status(err.status).json({
        con: false,
        msg: err.message,
      });
})

io.of('/chat').use(async (socket :any , next : NextFunction) => {
      let token = socket.handshake.query.token;
      if (token) {
       let decoded =  await checkToken(token)

         if (decoded) {
            let user = await get(decoded._id);
            if (user) {
               socket.userData = user;
               next();
            } else {
               next(new Error("Tokenization Error"));
            }
         } else {
            next(new Error("Tokenization Error"));
         }
      } else {
         next(new Error("Tokenization Error"));
      }
   }).on('connection', (socket : any) => {
      require('./utils/chat').initialize(io, socket);
   });

const defaultData = async ()=>{
  await migrate()
  await rp()
  await addOwnerRole()
}

// defaultData()

server.listen(port, ()=> console.log(`server is running in http://${host}:${port}`))