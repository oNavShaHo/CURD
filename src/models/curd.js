const express=require("express");
const mongoose=require("mongoose");
const curd=new mongoose.Schema({
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
   
    confirmpassword:{
        type:String,
        required:true,
        trim:true,
    },
  

})
const Curd=new mongoose.model("Curd",curd)
module.exports=Curd;