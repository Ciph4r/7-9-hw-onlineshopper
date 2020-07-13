const {check} = require('express-validator')


const userValidation = [
    check('name' ,'Name is required').not().isEmpty(),
    check('email' ,'pls included valid email').isEmail(),
    check('password' ,'pls included valid passsword').isLength({min:6}),
  ]

module.exports = userValidation