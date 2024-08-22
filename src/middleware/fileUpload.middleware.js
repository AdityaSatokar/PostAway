import multer from 'multer';

const imageUploadConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/storage/");
    },
    filename:(req,file,cb)=>{
        const name = "post"+Date.now().toString()+file.originalname;
        cb(null,name);
    }
})

const imageUpload = multer({storage:imageUploadConfig});
export default imageUpload;