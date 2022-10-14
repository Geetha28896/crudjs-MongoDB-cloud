const mongoose=require('mongoose')
let schema=mongoose.Schema

let productSchema=new schema({
    "product_name":String,
    "price":Number,
    "available_quantity":Number,
    "description":String,
    "offers":[]
})

module.exports=mongoose.model('tbl_products',productSchema)