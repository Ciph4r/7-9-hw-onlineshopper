const express = require('express');
const router = express.Router();
const User = require('./models/User')
const userValidation = require('./utils/userValidation')
const { register , updateProfile , updatePassword} = require('./controller/userController');
const passport = require('passport');
const { json } = require('express');
const { check , validationResult } = require('express-validator');
/* GET users listing. */
const { createUserCart} = require("../cart/controllers/cartController")
// const isAuth = (req , res,next) => {
//   if (req.user){
//     res.redirect(301,'/api/users')
//   }
//   next()
// }




router.get('/', function(req, res, next) {

  res.render('main/home')
});

router.get('/register', (req,res,next) => {
    if (req.isAuthenticated()){
    res.redirect(301,'/api/users')
  }
  res.render('auth/register')
})

router.get('/profile' ,  (req,res)=> {
  if (req.isAuthenticated()){
    return res.render('auth/profile')
  }
 return res.send('Unauthorized')
})

router.post('/register' , userValidation , register , createUserCart)


router.get('/login' ,  (req,res,next) => {
  if (req.isAuthenticated()){
    res.redirect(301,'/api/users')
  }
  return res.render('auth/login')
})

// router.get('/logout' , (req,res) => {
//   req.session.destroy()
//   req.logout()
//   return res.redirect('/api/users/login')
// })

router.get('/logout', (req, res) => {
  console.log('logout', req.session.cookie);
  // req.logout();
  res.clearCookie('connect.sid', {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  });
  req.session.destroy();
  // console.log('cookie', req.session);
  return res.redirect('/api/users/login');
});


   const checkInput= [
        check('email' ,'email is required').not().isEmpty(),
        check('password' ,'password is required').not().isEmpty()
]

const checkField = (req,res,next)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      req.flash('errors', errors.errors[0].msg)
      return res.redirect('/api/users/login')
  }
  next()
}



router.post('/login' , checkInput , checkField, passport.authenticate('local-login', {
  successRedirect: '/api/users',
  failureRedirect: '/api/users/login',
  failureFlash:true
})
)


router.get('/update-profile' , (req,res) => {
  res.render('auth/update-profile')
})

router.put('/update-profile' , (req , res , next) => {
updateProfile(req.body , req.user._id).then((user)=> {
  return res.redirect(301 , '/api/users/profile')
})
.catch(err => next(err))
})

const checkPassword = [
  check('newPassword' , ' Plz include valid password').isLength({min:6})
]

router.put("/update-password" , checkPassword , (req,res,next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()})
  }
  try {
    updatePassword(req.body , req.user._id).then(() => {
      return res.redirect('/api/users/profile')
    })
    .catch((err) => {
      console.log(err)
      req.flash('errors' , 'Unable to update')
      return res.redirect('/api/users/update-profile')
    })
  } catch (errors) {
    console.log(errors)

  }
  
})

// router.put('/update-profile' , (req,res) => {
//   return new Promise((resolve , reject) => {
//     User.findById({_id:req.user._id}).then((user) => {
//       const {
        
//         email,
//         address
//       } = req.body

//       if (req.body.name) user.profile.name = req.body.name
//       if (email) user.email = email
//       if (address) user.address = address
//       return user
//     }).then((user) => {
//       user.save().then((user)=>{
//         return res.json({user})
//       })
//       .catch((err)=> reject(err))
//     })
//     .catch((err)=> reject(err))
//   })
// })

// (req,res,next)=> {
//   User.findOne({email: req.body.email}).then((user)=> {
//     if (user){
//       return res.status(401).json({msg: 'User exist'})
//     }else {
//       const user = new User()
//       user.profile.name = req.body.name
//       user.email = req.body.email
//       user.password = req.body.password
//       user.save((err)=> {
//         if (err) return next(err)
//         return res.status(200).json({msg: 'success' , user})
//       })

//     }
//   })
 
// })



module.exports = router;
