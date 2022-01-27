const express=require('express');
const router=express.Router();
const jwt=require("jsonwebtoken")
const jwtSecret="asd889asdas5656asdas887"
const multer=require('multer')
const uuidv4=require('uuid')
const helper=require('../helpers/helper')
const path=require('path')
const {check,validationResult}=require('express-validator')
const userModel=require('../db/userSchema')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/Full stack/React/InvoiceApplication/invoiceapp/public/image/')
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }
});
router.post('/updatecompany',upload.single('file'),(req,res)=>{
    let email=req.body.email;
    let companyname=req.body.companyname;
    let address=req.body.companyaddress
    userModel.updateOne({email:email},{$set:{companyName:companyname,address:address,logo:req.file.filename}},(err)=>{
        if(err){
            res.json({err:1})
        }
        else{
            res.json({err:0})
        }
    })
})
router.post('/getlogo',(req,res)=>{
    let email=req.body.email
    userModel.find({email:email},(res,data)=>{
        if(err){
            res.json({err:1})
        }
        else{
            res.json(data)
        }
    })
})
router.post('/adduser',upload.single('file'),(req,res)=>{
    // const errors=validationResult(req)
    // console.log(errors);
    // if(!errors.isEmpty()){
    //     let alert=errors.array()
    //     userModel.find({},(err,data)=>{
    //         if(err) throw err;
    //         res.json({data:data,alert})
    //     })
    // }
    // else{
    let name=req.body.name;
    let lastname=req.body.lastname;
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    let companyname=req.body.companyname;
    let address=req.body.companyaddress
    console.log(req.file);
    console.log('Hello');
    // console.log(upload);
    let ins=new userModel({name:name,lastname:lastname,username:username,email:email,companyName:companyname,logo:req.file.filename,address:address,password:password});
    ins.save((err)=>{
        if(err){res.json({err:1})}
        else{
            res.json({err:0})
        }
    })
// }
})
router.post('/loginuser',(req,res)=>{
    let username=req.body.username;
    let Password=req.body.password;
    userModel.find({$and:[{email:{$eq:username}},{password:{$eq:Password}}]},(err,data)=>{
        if(data[0]==null){
            res.json({err:1,"msg":"Email or password is not correct"})
        }
        else{
            let payload={uid:data}
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})
module.exports=router