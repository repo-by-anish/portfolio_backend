const express=require("express")

const router=express.Router()

router.get("/",async (req,res)=>{
    res.json({message: "Working correctly"})
})

module.exports=router