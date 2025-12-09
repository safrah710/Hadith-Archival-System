import { client,dbname } from "../Model/index.js";
const add=async(req,res)=>{
    await client.connect();
    try{
        let db= client.db(dbname);
        let{title,etitle,tcontent,econtent}=req.body;
        console.log(title);
        await db.collection('Hadith').insertOne({
            title,etitle,tcontent,econtent
        })
        res.status(200).send({
            message:"Hadith Added Suuccessfulluy"
        })

    }
    catch(err){
        res.status(400).send({
            message:"Try again after sometime"
        })
    }
}
const get=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname);
       let data= await db.collection('Hadith').find().toArray();
        res.status(200).send({
            message:"Hadith Fetched Successfully",
            data: data
        })

    }
    catch(err){
        res.status(400).send({
            message:"Data Error"
        })
    }
}

const get_details=async(req,res)=>{
    await client.connect();
    let {str}=req.query;
    try{
        let db=client.db(dbname);
        let data=await db.collection("Hadith").find({etitle:str}).toArray();;
        console.log(data);
        res.status(200).send({
            message:"Data Fetched Successfully",
            data:data
        })
    }
    catch(err){
        res.status(400).send({
            message:err.message
        })
    }
}
const delete1=async(req,res)=>{
    await client.connect();
try{
    let db=client.db(dbname);
    let {title}=req.query;
    console.log(title);
    await db.collection("Hadith").deleteOne({title:title});
    res.status(200).send({
        message:"Data deleted succesfully"
    })

}
catch(err){
  res.status(400).send({
        message:"Data not deleted succesfully"
    })
}
}
export default{
    add,get,get_details,delete1
}   