import mongoose, {Schema} from 'mongoose'

export interface deliveryDocument extends mongoose.Document{
    name : string
    image : string
    price : number
    duration : string
    remark : any
    created : Date 
}

const deliveryModel = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    price : {type : Number , require : true},
    duration : {type : String , required : true},
    remark : {type : Array},
    created : {type : Date , default : Date.now}
})

const delivery = mongoose.model<deliveryDocument>("delivery" , deliveryModel )
export default delivery