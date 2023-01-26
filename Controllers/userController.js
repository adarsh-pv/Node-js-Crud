import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import  Jwt from 'jsonwebtoken'



export const getHome=async(req,res)=>{
  const {userId} = req.body
  const allusers = await userModel.find({_id:{$nin:[userId]}})
    const users = await userModel.findOne({_id:userId})
    console.log(users,"jkj")
      res.render('home',{users,allusers})
    }
export const DeleteUser = async(req,res)=>{
const {userid} = req.params
console.log(req.body,"ooo")
const response = await userModel.findByIdAndDelete(userid)
console.log(response,"dd")
res.redirect('/')

}
export const PostUser =async (req,res)=>{
   const {id,name,number} = req.body
    const response = await userModel.findByIdAndUpdate(id,{name,number})
    res.redirect('/')
}
export const editUser = async (req,res)=>{
    const {id} = req.params
console.log(req.params)
    const User = await userModel.findById(id)
    res.render('edit',{User})
  
}
export const getRegister = (req,res)=>{
    res.render('signup')
}

export const getLogin = (req,res) =>{
    res.render('login')
}

export const postLogin =async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email:email})
    if(!user) return res.render('login',{err:'user not exist'})
    
    const payload = {
        userId:user._id,
        username:user.name
    }
    if(password){
        const response = await bcrypt.compare(password,user.password);  
        const token = Jwt.sign(payload,process.env.secret,{expiresIn:'1h'})
        console.log(token)
        if(response) return res.cookie('token',token).redirect('/')
        res.render('login',{err:'password-wrong'})
    }
}
 export const hashPassword =async (password)=>{
 const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
 const hash = await bcrypt.hash(password,salt)
 return hash
}
export const postSignup =async (req,res)=>{
    const  { name,email,number,password,conpassword } =  req.body
    const hashed = await hashPassword(password)

  const User = new userModel({
    name,
    email,
    number,
    password:hashed
  })
  User.save()
  res.redirect('/login')
}