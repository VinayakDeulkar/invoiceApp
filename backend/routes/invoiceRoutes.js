const express=require('express');
const router=express.Router();
const pdf=require('html-pdf');
const invoiceSchema=require('../db/invoiceSchema')
const userSchema=require('../db/userSchema')
const nodemailer=require('nodemailer')
const path=require('path')
router.post('/getuser',(req,res)=>{
    invoiceSchema.find({user_email:req.body.email},(err,data)=>{
        if(err){
            res.json({err:0})
        }
        else{
            res.json({err:1,invoicedata:data})
        }
    })
})

router.post('/changeStatus',(req,res)=>{
    let id=req.body.id;
    let status=req.body.status
    if(status==='PartialPaid'){
        let amount=req.body.amount;
        invoiceSchema.find({invoice_number:id},(err,data)=>{
            if(err){
                res.json({err:0})
            }
            else{
                let paidamount=data[0].paid_amount+amount;
                console.log(paidamount);
                let remainingamount=data[0].remaining_amount-paidamount
                invoiceSchema.updateOne({invoice_number:id},{$set:{Status:"PartialPaid",paid_amount:paidamount,remaining_amount:remainingamount}},(err)=>{
                    if(err){
                        console.log('inside 1st err');
                    }
                    else{
                        console.log(data);
                        invoiceSchema.find({invoice_number:id},(err,data)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                // pdf.create(pdfTemplate(data[0]),{}).toFile(`invoice${data[0].invoice_number}${data[0].Status}.pdf`,(err)=>{
                                //     if(err){
                                //         console.log('Pdf not send');
                                //     }
                                //     else{
                                //         console.log('Pdf is created');
                                //         main(`invoice${data[0].invoice_number}${data[0].Status}`,data[0].user_email)
                                //     }
                                // })
                            }
                        })
                        
                    }
                })
            }
        })
       
    }
    else{
        invoiceSchema.find({invoice_number:id},(err,data)=>{
            if(err){
                res.json({err:0})
            }
            else{
                let paidamount=data[0].remaining_amount;
                console.log(data);
                let remainingamount=0;
                invoiceSchema.updateOne({invoice_number:id},{$set:{Status:"Paid",paid_amount:paidamount,remaining_amount:remainingamount}},(err)=>{
                    if(err){
                        console.log('inside 2nd err');
                    }
                    else{
                        console.log(data);
                        invoiceSchema.find({invoice_number:id},(err,data)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                // pdf.create(pdfTemplate(data[0]),{}).toFile(`invoice${data[0].invoice_number}${data[0].Status}.pdf`,(err)=>{
                                //     if(err){
                                //         console.log('Pdf not send');
                                //     }
                                //     else{
                                //         console.log('Pdf is created');
                                //         main(`invoice${data[0].invoice_number}${data[0].Status}`,data[0].user_email)
                                //     }
                                // })
                            }
                        })
                    }
                })
            }
        })
        
    }
})
async function main(pdfname,email){
    console.log(pdfname);
    console.log(email);
    let transpoter=nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:'emperorrock50@gmail.com',
            pass:'EmperorRock50'
        }
    })
    let mailOptions={
        from:'emperorrock50@gmail.com',
        to:email,
        subject:'Invoice mail   ',
        text:'Sending you the pdf bill copy',
        attachments:[{filename:`${pdfname}.pdf`,path:`./${pdfname}.pdf`}]
    }
    transpoter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log(err);
        }
        return console.log('Email sent!!!');
    });
}

//AddIng invoice
router.post('/addinvoice',(req,res)=>{
    let amount=0
    req.body.Products.forEach(element => {
        amount+=parseInt(element.Total)
    });
    invoiceSchema.count((err,count)=>{
        console.log( "Number of docs: ", count );
        userSchema.find({email:req.body.user_email},(err,data)=>{
            console.log(data);
            const invoicedata={
            invoice_number:count+1,
            user_email:req.body.user_email,
            Receiver_name:req.body.Revicer_name,
            Receiver_Address:req.body.Revicer_address,
            Due_date:req.body.Due_date,
            Products:req.body.Products,
            Status:"Unpaid",
            paid_amount:0,
            remaining_amount:amount,
            logo:data[0].logo
        }
        let ins=new invoiceSchema(invoicedata)
        ins.save((err)=>{
            if(err){res.json({err:1})}
            else{
                // pdf.create('index',{invoicedata:invoicedata}).toFile(`invoice${invoicedata.invoice_number}${invoicedata.Status}.pdf`,(err)=>{
                //     if(err){
                //         console.log('Pdf not send');
                //     }
                //     else{
                //         console.log('Pdf is created');
                //         main(`invoice${invoicedata.invoice_number}${invoicedata.Status}`,invoicedata.user_email)
                //     }
                // })
                res.json({err:0})
            }
        })
        })
        
        
    })
    
})
module.exports=router