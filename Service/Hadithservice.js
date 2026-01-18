import { client,dbname } from "../Model/index.js";
const add=async(req,res)=>{
    await client.connect();
    try{
        let db= client.db(dbname);
        let{title,etitle,tcontent,econtent,tlink,elink}=req.body;
        console.log(title);
        await db.collection('Hadith').insertOne({
            title,etitle,tcontent,econtent,tlink,elink
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
const download = async (req, res) => {
    await client.connect()
    try {
        let db=client.db(dbname);
        const { title,lang} = req.body;
        

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const data = await db.collection("Hadith").findOne({ title: title });

        if (!data) {
            return res.status(404).json({ message: "No document found with this title" });
        }
        if (!data.tlink) {
            return res.status(400).json({ message: "No link found in database" });
        }
        if(lang=="Tamil"){
 return res.json({ link: data.tlink });
        }
        if(lang=="English"){
return res.json({ link: data.elink });
        }
          

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
const update = async (req, res) => {
  await client.connect();

  try {
    const db = client.db(dbname);

    const { oldTitle, title, etitle, tcontent, econtent, tlink, elink } = req.body;
    console.log(oldTitle )

    if (!oldTitle) {
      return res.status(400).send({ message: "Old Title is required" });
    }

    const result = await db.collection("Hadith").updateOne(
      { title: oldTitle }, 
      {
        $set: {
          title,
          etitle,
          tcontent,
          econtent,
          tlink,
          elink,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Hadith not found" });
    }

    res.status(200).send({
      message: "Hadith Updated Successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "Update Error",
      error: err.message,
    });
  }
};






export default{
    add,get,get_details,delete1,download,update
}   