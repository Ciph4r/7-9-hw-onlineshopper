const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../routes/users/models/User')
const bcrypt = require('bcryptjs')
// const { authenticate } = require('passport')
const {check , validationResult} = require('express-validator')

passport.serializeUser((user, done) => {
    done(null, user._id)
})


passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user)
    })
})


const authenticatePassword = async (inputPassword , user , done , req) => {
    const exist = await bcrypt.compare(inputPassword , user.password)

    if(!exist){
        return done(null , false , req.flash('errors' , 'check email or password'))
    }
    return done(null,user)
}

const verifyCallback = async (req, email , password , done) => {
    await User.findOne({email} , (err,user) => {
        try {
            if(!user) {
                return done(null , false , req.flash('errors' , 'no user found'))
            }

            authenticatePassword(password , user , done, req)
        } catch (error) {
            done(error , null)
        }
    })
}


passport.use('local-login' , new localStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
},
verifyCallback
))