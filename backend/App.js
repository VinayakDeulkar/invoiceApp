const express=require('express');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const PORT=5000;
const app=express();

app.use(express.json());
app.use(express.static("invoiceapp/build"))
app.use(express.urlencoded({extended:false}));
app.use(cors())
const db="mongodb://localhost:27017/invoiceapp";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true})
            console.log("MongoDB connected")
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//load routes
const invoiceRoutes=require('./routes/invoiceRoutes')
const userRoutes=require('./routes/userRoutes')
app.use("/api/user",userRoutes)
app.use("/api/invoice",invoiceRoutes)
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"invoiceapp/build/index.html"))
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})