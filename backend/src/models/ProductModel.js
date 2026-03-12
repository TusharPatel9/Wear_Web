const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
     description:{
        type:String,
        required:true,
    },
     price:{
        type:Number,
        required:true,
    },
     quantity:{
        type:Number,
        required:true,
    },
     size:{
        type:String,
        required:true,
        enum:["S","M","L","XL","XXL"],
        uppercase:true
    },
     color:{
        type:String,
        required:true,
    },
     images:{
         type:[String],
        required:true,
    },

},{
    timestamps:true
})

module.exports=mongoose.model("Product",productSchema)