const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {
    validationResult
} = require('express-validator')
const { resolveInclude } = require('ejs')


module.exports = {

    register: async(req,res,next) => {
                const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('errors' , errors.array()[0].msg)
            return res.redirect('/api/users/register')
            // res.status(422).json({errors: errors.array()})
        }

        try{
            const {name , email, password} = req.body
            let user = await User.findOne({email})
            // if(user) 
            // return res.status(401).json({msg: 'User exist'})
            if(user){
                req.flash('errors' , 'User exist')
                return res.redirect('/api/users/register')
            }

            user = await new User({profile: {name} , email , password})

            await user.save()
            await req.login(user , (err) => {
                if (err) {
                    return res.status(400).json({comfrim: 'false' , msg: err})
                }else {
                    // res.redirect(301,'/api/users')
                    next()
                }
            })
         
        }
        catch (err){
            return res.status(500).json({errors: errors.array()})
        }
    },

    // register: (req, res, next) => {
    //     const errors = validationResult(req)
    //     if (!errors.isEmpty()){

    //         req.flash('errors' , errors.array()[0].msg)
    //         return res.redirect('/api/users/register')
    //         // return res.status(422).json({
    //         //     errors: errors.array()
    //         // })

    //     }
            
    //     User.findOne({
    //         email: req.body.email
    //     }).then((user) => {
    //         if (user) {
    //              req.flash('errors' , 'User exist')
    //             return res.redirect('/api/users/register')
    //             // return res.status(401).json({
    //             //     msg: 'User exist'
    //             // })
    //         } else {
    //             const user = new User()
    //             user.profile.name = req.body.name
    //             user.email = req.body.email
    //             user.password = req.body.password
    //             user.save().then(user => {
    //                 req.login(user, (err) => {
    //                     if (err) {
    //                         return res.status(400).json({
    //                             comfirmation: false,
    //                             msg: err
    //                         })
    //                     } else {
    //                         res.redirect('/api/users')
    //                     }

    //                 })
    //             })

    //         }
    //     })
    // },
    updateProfile : (params , id) => {
        return new Promise ((resolve , reject) => {

            User.findById(id).then((user) => {

                if (params.name) user.profile.name = params.name
                if (params.email) user.email = params.email
                if (params.address) user.address = params.address
                return user
              }).then((user) => {
                user.save().then((user)=>{
                //   return res.redirect(301 , '/api/users/profile')
                  resolve(user)
                })
                .catch((err)=> reject(err))
              })
              .catch((err)=> reject(err))
              
        })
    },

    updatePassword: (params, id) => {
        return new Promise((resolve, reject) => {
          User.findById(id)
            .then((user) => {
              const { oldPassword, newPassword, RepeatNewPassword } = params;
              if (!oldPassword || !newPassword || !RepeatNewPassword) {
                reject('All Inputs Must Be Filled');
              } else if (newPassword !== RepeatNewPassword) {
                reject('New Password Do Not Match');
              } else {
                bcrypt
                  .compare(oldPassword, user.password)
                  .then((match) => {
                    if (!match) {
                      reject('Password Not Updated');
                    } else {
                      user.password = newPassword;
                      user
                        .save()
                        .then((user) => {
                          resolve(user);
                        })
                        .catch((err) => reject(err));
                    }
                  })
                  .catch((err) => reject(err));
              }
            })
            .catch((err) => reject(err));
        });
      }

}