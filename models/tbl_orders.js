const mongoose=require('mongoose')
let schema=mongoose.Schema


let orderSchema= new schema({
    "_id": {type:mongoose.Schema.Types.ObjectId},
    "userId": Number,
    "quantity": Number,
    "timeStamp":String,
    "orderPrice":Number,
    "productId": {type:mongoose.Schema.Types.ObjectId, ref: 'tbl_products',require:true},
})

module.exports=mongoose.model('tbl_ord',orderSchema)