const imageFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif)$/)){
        req.fileValidationError='only images files are allowed';
        return cb(new Error("only images files are allowed"))
    }
    cb(null,true);
};
exports.imageFilter=imageFilter;