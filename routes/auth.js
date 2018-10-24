const router = require('express').Router()
const User = require('../models/User')
const sendMail = require('../helpers/mailer').sendMail
const Company = require('../models/Company')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.get('/signup/users',(req,res,next)=>{
  Company.find()
  .then(companies=>{
    res.render('auth/signalot',{companies})  
  })
  .catch(e=>next(e))
})

router.post('/signup/users',(req,res,next)=>{
  const x = req.body.info.split(',')
  Company.findOne({companyName:req.body.companyName})
  .then(company=>{
    x.forEach(element => {
      let username = element[0]+element[1]+element[2]+element[3]
      let contraseña = element[0]+element[1]+element[2]+(Math.floor(Math.random()*1000))
      console.log(contraseña)
      User.register({email:element,companyName:company.companyName,companyId:company._id,username:username},contraseña)
      .then(user =>{
        Company.findByIdAndUpdate(company._id,{$push:{users:user._id}})
        .then(company=>console.log(company))
        .catch(e=>next(e))
        sendMail(element,`Bienvenido a AutoSardina.com`, `Bienvenido ${user.email} ,
        <p>Agradecemos tu preferencia, tu contraseña inicial es <b>${contraseña}</b>, Loggeate
        y empieza a disfrutar del verdadero transporte rapido, seguro y barato</p>
        <h3><a href="http://localhost:3000/login">Dale click aqui para loggearte a tu pagina</a></h3>`)
      })
    })
    res.redirect('/signup/users')
  })
})

// router.get('/signup',(req,res,next)=>{
//   Company.find()
//   .then(companies=>{
//     console.log(companies)
//     res.render('auth/signup',{companies})  
//   })
//   .catch(e=>next(e))
  
// })

// router.post('/signup',(req,res,next)=>{
//   User.register(req.body,req.body.password)
//   .then(user=>{ 
//     sendMail(req.body.email,`Gracias por tu aportación`)
//     res.redirect('/signup')
//   })
//   .catch(e=>next(e))
// })

router.get('/logout',(req, res, next)=>{
  req.logOut()
  req.app.locals.loggeduser = null
  res.redirect('/login')
})

router.get('/login',(req,res,next)=>{
  res.render('auth/login')
})

router.post('/login',passport.authenticate('local'),(req,res,next)=>{
  //console.log(req.user)
  req.app.locals.loggeduser = req.user
  res.redirect(`/profile/company/${req.user.companyId}`)
})

router.get('/signup/company',(req,res,next)=>{
  res.render('auth/signupCompany')
})

router.post('/signup/company',(req,res,next)=>{
  Company.create(req.body)
  .then(company=>{ 
    res.redirect('/signup/company')
  })
  .catch(e=>next(e))
})


module.exports=router