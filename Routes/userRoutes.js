import { DeleteUser, getHome, getLogin, getRegister, postLogin, postSignup } from '../Controllers/userController.js'
import { Router } from 'express'
import auth from '../Middlewars/auth.js'
 const router = Router()

 router.get('/',auth,getHome)
router.get('/delete/:userid',auth,DeleteUser)
router.get('/edit/:userid',auth,editUser)
router.use((req,res,next)=>{
 if(req.cookies.token) return res.redirect('/')
 next()
})
 router.route('/signup').get(getRegister).post(postSignup)
 router.route('/login').get(getLogin).post(postLogin)

 export default  router
