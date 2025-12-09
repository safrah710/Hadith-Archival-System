import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const hash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log("Hashing Error:", err);
    return null; 
  }
};

const compare=async(password,hashed)=>{ 
        try{
            return await bcrypt.compare(password,hashed); 
        }
        catch(err){
            return err;
        }
}
const gentok=(payload)=>{
    try{
        return  jwt.sign(
        payload,
        process.env.jwt,
        {expiresIn:'2min'}
    )
    }
    catch(err){
        return err;
    }
}

export default {compare,hash,gentok};