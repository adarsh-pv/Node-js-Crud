import  Jwt  from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

export default function(req,res,next)
{
 const {token} = req.cookies
  Jwt.verify(token,process.env.secret,(err,decoded)=>{
   if(err)
   {
    console.log(err)
    res.clearCookie('token').redirect('/login')
   }
   if(isValidObjectId(decoded.userId))
   {
   const {userId} = decoded
   req.body.userId = userId
   next()
   }
   else{
    res.clearCookie('token').redirect('/login')
    
   }
 })

}



