const allowedOrigins = require("./allowdOrigins")

const corsOptions={
    origin:(origin,callback)=>{
        if (allowedOrigins.indexOf(origin)!==-1) {
            callback(null,true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    credential:false,
    optionSuccessStatus:200
}

module.exports=corsOptions