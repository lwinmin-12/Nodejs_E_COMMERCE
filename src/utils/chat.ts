import { get,set } from "./helper";
import messageModel from "../models/message.model"
import unreadModel , {unreadDocument} from "../models/unread.model"
import config from "config";
// import { NextFunction } from "express";
// const Redis = require('async-redis').createClient();

export let liveUser = async (socketId : any , user : any)=>{
    user['socketId'] = socketId
    set(socketId,user._id)
    set(user._id , user)
}


export let initialize = async (io : any , socket : any) =>{
    // console.log(socket.userData);
    socket['currentUserId'] = socket.userData._id
    await liveUser(socket.id , socket.userData)

    socket.on("message" , (data : any) => incomingMessage (io , socket ,data))
    socket.on("unreads" , (data : any)=> loadUnReadMsg(socket))
    socket.on("load-more" , (data : any)=> loadMore(socket , data))

}   

let loadMore = async(socket : any , obj : any)=>{
    const msgLimit = config.get<number>('msg_limit')
    let skip = Number(obj.page) == 1 ? 0 : (Number(obj.page) -1)
    let skipCount = skip * msgLimit
    let messages = await messageModel.find({
        $or : [
            {from :  socket.currentUserId},
            {to : socket.currentUserId}
        ]
    }).sort({created : -1}).skip(skipCount).limit(msgLimit).populate('from to' , "name _id")
    socket.emit('messages',messages)
}

let loadUnReadMsg = async(socket : any)=>{
    let unreads =  await unreadModel.find({to:socket.currentUserId})
    if( unreads.length > 0 ){
        unreads.forEach(async(ea : unreadDocument ) => {
            await unreadModel.findByIdAndDelete(ea.id)
        });
    }
}

let incomingMessage = async (io : any, soket: any, data : any ) => {
   const saveMsg = await new messageModel(data).save()
   let msgResult = await messageModel.findById(saveMsg._id).populate('from to' , "name _id")
   if(!msgResult){
    throw(new Error("there is no msg"))
   }
   const toUser = await get(msgResult.to._id);

   if(toUser) {
    let toSocket = io.of('/chat').to(toUser.socketId)
    console.log(toSocket)
    if(toSocket){
        toSocket.emit("message" , msgResult)
    }else{
        throw (new Error ("To Socket Not found"))
    }
   }else{
    await new unreadModel({from : msgResult.from._id , to : msgResult.to._id}).save()
    // console.log(msgResult.from._id )
   }

   soket.emit('message' , msgResult)
}