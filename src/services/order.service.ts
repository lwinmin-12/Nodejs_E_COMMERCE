import orderModel, { orderDocument } from '../models/order.model'
import productModel from '../models/product.model'
import { userDocument } from '../models/user.model'

export const addOrder = async (payload : orderDocument ) =>{

    let user = payload.user
    let items = payload.items
    let total = 0
    
    let saveOrder = new orderModel()
    let orderItemsObj : Array<orderDocument>= []
     
    for await(let item of items){
        let product = await productModel.findById(item.id)

        if(!product){
            throw new Error('product not exist')
        }

        let obj : any = {
            order : saveOrder._id,
            count : item.count,
            productId : product._id,
            name  : product.name,
            price : product.price
        }

       orderItemsObj.push(obj);
       total += product.price * item.count;
    }

    let orderItemIds = items.map((ea : any) => ea.id)
    saveOrder.user = user._id;
    saveOrder.items = orderItemIds
    saveOrder.count = items.length
    saveOrder.total = total
    let result = await saveOrder.save()
    return result
 }


export const getOrder = async (payload : userDocument ) => {
      let authUser = payload
      return await orderModel.find({user : authUser._id}).populate('items')
}