import express from 'express'
import mongoose  from "mongoose"
import  {config} from 'dotenv'
import  handlebars  from 'hbs'
import  route  from './Routes/userRoutes.js'
import cookieParser from 'cookie-parser'
 
config()


const port = 3000
const app = express()

app.use(express.json({}))
app.use(express.urlencoded())
app.use(cookieParser())
const db = process.env.db
 mongoose.connect(process.env.db)
 app.set('view engine','hbs')
 app.use(express.static("public"))
 const connection = mongoose.connection
 connection.on('connected',()=>{
   console.log("connected")
  })
  connection.on('error',(err)=>{
    console.log(err)
  })
  
  app.use('/',route)
  app.listen(port,(req,res)=>{
    console.log(`connected ${port}`)
  })