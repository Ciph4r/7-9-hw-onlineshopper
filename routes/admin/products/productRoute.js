const router = require('express').Router()
const Product = require('./models/Products')


router.get('/all-products/:id' , (req,res,next) => {
    Product.find({category: req.params.id}).populate('category').exec((err, foundproduct) => {
        if (err) return next(err)
        return res.render('main/category' , {products: foundproduct})
    })
})

router.get('/single-product/:id' , (req,res) => {
    Product.findById({_id : req.params.id}).then((foundProduct) => {
        return res.render('main/single-product' , {product: foundProduct})
    })
})


module.exports = router