const router = require('express').Router()
const User = require('../models/User')
const Company = require('../models/Company')
const uploadCloud = require('../helpers/cloudinary')
const Route = require('../models/Route')

router.get('/company/:id',(req,res,next)=>{
  const {id} = req.params
  User.findById(req.user._id).populate('companyId')
  .then(user=>{
    Company.findById(user.companyId).populate('routes')
    .then(company=>{
    res.render('profile/company',{user,company})
    })
  })
  .catch(e=>next(e))
})

router.get('/user/:id',(req,res,next)=>{
  User.findById(req.user._id).populate('routes')
  .then(user=>{
    console.log(user)
    res.render('profile/user',user)
  })
})
router.get('/route/new',(req,res,next)=>{
  res.render('routes/new')
})

router.post('/route/new', async (req,res,next)=>{
  //Router.create({start:req.body.start,destiny:req.body.destiny,time:req.body.time,seats:req.body.seats,TE:req.body.TE,user:req.user._id,company:req.user.companyId})
  try{
  const ruta = await Route.create({...req.body,user:req.user._id,company:req.user.companyId })
  const u = await User.findByIdAndUpdate(req.user._id,{$push:{routes: ruta._id}})
  const company = await Company.findByIdAndUpdate(u.companyId,{$push:{routes:ruta._id}})
  console.log(ruta)
  res.redirect(`/profile/user/${req.user._id}`)
  }
  catch(e){
    console.log(e)
  }
})
router.get('/route/delete/:id',(req,res,next)=>{
  const {id} =req.params
  console.log(req.params)
  Route.findByIdAndRemove(id)
  .then(r=>res.redirect(`/profile/user/${r.user}`))
  .catch(e=>next(e))
})
router.get('/route/detail/:id',(req,res,next)=>{
  const {id} = req.params
  Route.findById(id).populate('user')
  .then(ruta=>{
    if(req.user._id != ruta.user._id){
      user2=req.user
      res.render('routes/detail',{ruta,user2})
    }
    else res.render('routes/detail',{ruta})
  })
  .catch(e=>next(e))
})
router.post('/route/detail/:id',(req,res,next)=>{
  const {id} = req.params
  Route.findByIdAndUpdate(id,{$push:{passenger:req.user._id}})
  .then(ruta=>{
    res.redirect(`/profile/company/${req.user.companyId}`)
  })
})

router.get('/user/editar/:id',(req,res,next)=>{
  const{id} = req.params
  User.findById(id)
  .then(user=>{
    res.render('profile/editar',user)
  })
  .catch(e=>next(e))
})

router.post('/user/editar/:id',uploadCloud.single('image'),(req,res,next)=>{
  const {id}=req.user._id
  if(req.file)req.body['photoURL']=req.file.url
    User.findOneAndUpdate({username:req.user.username},{$set:req.body})
    .then(user=>{
      console.log(user)
      res.redirect(`/profile/user/${user._id}`)
    })
  })

module.exports = router