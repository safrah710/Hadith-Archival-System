import { client,dbname } from "../Model/index.js";
import Auth from "../Auth/Auth.js";
import nodemailer from "nodemailer";
import 'dotenv/config.js';
const login=async(req,res)=>{
    try{
        await client.connect();
       let db=client.db(dbname);
       let email=req.body.email;
       let password=req.body.password;
       let data=await db.collection("User").findOne({email:email});
       if(data){
           if(Auth.compare(password,data.hashed)){
              let payload={
                    name:data.firstName,
                    age:data.age,
                    email:data.email
              }
              let token=Auth.gentok(payload);
              res.status(200).send({
                message:"Logged successfully",
                token,
                name:data.firstName
              })
           }
           else{
             res.status(402).send({
            message:"Password wrong"
              })
            return;
           }
       }
       else{
        res.status(401).send({
            message:"No User Found"
        })
        return;
    }
    }
    catch(err){
      res.status(400).send({
            message:err.message
        })
    }
}
const Signup=async(req,res)=>{
    
    try{
        await client.connect();
        let db= client.db(dbname);
        const {firstName,lastName,gender,age,email,phone,password,confirmPassword}=req.body;
        if(password!=confirmPassword){
            res.status(401).send(
                {
                    message:"Password Mismatch"
                }
            )
            return;
        }
        let data=await db.collection("User").findOne({email:email});
        if(data){
            res.status(402).send({
                message:"User Already Found"
            })
            return;
        }
        else{
            let hashed=Auth.hash(password);
        await db.collection("User").insertOne({
            firstName,lastName,gender,age,email,phone,password: hashed,
        })
        res.status(200).send({
            message:"Account created Sucessfully"
        })

        }
        
    }
    catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}
const get=async(req,res)=>{
    await client.connect()
    try{
        let db= client.db(dbname);
        let data=await db.collection('User').find().toArray();
        res.status(200).send({
            message:"Fetched Successfully",
            data:data
        })
    }
    catch(err){
        res.status(400).send({
            message:"Fetching not  Successfull",
        })
    }
}
 const delete1=async(req,res)=>{
     await client.connect()   
     let {email}=req.query; 
    try 
    {
       let db=client.db(dbname);
       await db.collection("User").deleteOne({email:email});
       res.status(200).send({
        message:"User Deleted"
       })
    }
        catch{
       res.status(400).send({
        message:"something Went Wrong"
       })
        }
 }
 const forgot = async (req, res) => {
        await client.connect();
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        let db = client.db(dbname);
        let data=await db.collection("User").findOne({email:email});
        if(!data){
             return res.status(400).json({ message: "Email is not found" });
        }
        let ascii = 65;
        let otp = "";
        for (let i = 0; i < 6; i++) {
            let ind = Math.floor(Math.random() * 26);
            let c = String.fromCharCode(ascii + ind);
            otp += c;
        }
        console.log(process.env.GMAIL_USER);
        console.log(process.env.GMAIL_PASS );
         const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_USER ,
            pass: process.env.GMAIL_PASS ,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: `"Hadith Archival System" <${process.env.GMAIL_USER || "azsafrah@gmail.com"}>`,
          to: email,
          subject: "Password Reset OTP",
           text:
            "Dear User,\n\n" +
            "You have requested to reset your password for the Hadith Archival System account.\n\n" +
            `Your One-Time Password (OTP) is: ${otp}\n\n` +
            "This OTP is valid for the next 10 minutes. Please keep it confidential and do not share it with anyone.\n\n" +
            "If you did not request a password reset, please ignore this email.\n\n" +
            "Regards,\nHadith Archival System Support Team",
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: "OTP generated successfully",
            otp: otp
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const change = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const hashed = await Auth.hash(password);
    if (!hashed) {
      return res.status(500).json({ message: "Password hashing failed" });
    }
    await client.connect();
    let db = client.db(dbname);

    const updateResult = await db.collection("User").updateOne(
      { email: email },
      { $set: { password: hashed } }
    );
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Email not found" });
    }
    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default{
    login,Signup,get,delete1,forgot,change
}