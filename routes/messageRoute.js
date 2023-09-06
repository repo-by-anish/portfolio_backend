const {createMessage,getAllMessages} = require("../controllers/messageController");

const express=require("express");

const router=express.Router();

router
.get("/",getAllMessages)
.post("/",createMessage);

module.exports=router