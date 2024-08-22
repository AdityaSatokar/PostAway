const invalidRouteHandler=(req,res,next)=>{
    res.status(404).json({success:false,msg:`invalid path ${req.originalUrl}`})
    next();
};

export default invalidRouteHandler;