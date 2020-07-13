const {validationResult } = require('express-validator');





const categoryValidation = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('errors', errors.errors[0].msg)
        return res.redirect('/api/admin/add-category')
    }
    next()
  }

  module.exports = categoryValidation
  

