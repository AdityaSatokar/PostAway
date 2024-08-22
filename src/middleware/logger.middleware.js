import fs from "fs";

const fsPromise = fs.promises;

const logData=async(data)=>{
    try{
        await fsPromise.appendFile("src/logs/logs.txt",data);
    }catch(err){
        console.log(err);
    }
}

const loggerMiddleware=async(req,res,next)=>{
    const data=`${new Date().toString()}\nreq-URL:${req.originalUrl}\nreq-body:${JSON.stringify(req.body)}\n\n`;
    await logData(data);
    next();
}

export default loggerMiddleware;