
const Catagory = require('../models/Catagory');



const getAllCategories = (req,res,next) => {
  Catagory.find({} , (err, categories) => {
    if (err) return next(err)
    res.locals.categories = categories
    next()
  })
}

module.exports = getAllCategories