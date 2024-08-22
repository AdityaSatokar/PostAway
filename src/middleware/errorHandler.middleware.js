export default class customError extends Error{
    constructor(statusCode,errMessage){
        super();
        this.statusCode = statusCode;
        this.message = errMessage;
    }
}

export const errorHandler=(err,req,res,next)=>{
    if(err instanceof customError){
        res.status(err.statusCode).send(err.errMessage);
    }else{
        res.status(500).send("Oops! Something went wrong... Please try again later!")
    }
}