const express = require('express');
const router = express.Router();
const Product = require('./admin/products/models/Products')

/* GET home page. */
const paginate = (req,res,next) => {
  const perPage = 6
  const page = req.params.pageNumber
  Product.find().skip(perPage * (page-1)).limit(perPage).populate('category').exec((err,products)=> {
    if(err) return next(err)
    Product.countDocuments().exec((err , count) => {
      if(err) return next(err)
      return res.render('main/home-products' , {products , pages : Math.ceil(count/perPage), page: +page})
    })
  })
}



const data = [
  {
    title: 'Coco Oil',
    description: `Some quick example text to build on the card title and make
    up the bulk of the card's content.`,
    img: "random-products/coco-oil.jpg"
  },
  {
    title: 'White Earrings',
    description: `Flats elegant pointed toe design cut-out sides luxe leather
    lining versatile shoe. Everyday wear or night on the town.`,
    img: "earrings.jpg"
  },
  {
    title: 'Playstation',
    description: `Bodycon skirts bright success colours punchy palette pleated
    must-have new season.`,
    img: "random-products/remote.jpg"
  },
  {
    title: 'Oxford Shoes',
    description: ` Some quick example text to build on the card title and make
    up the bulk of the card's content.`,
    img: "oxford.jpg"
  },
  {
    title: 'Bamboo Moisture',
    description: `Flats elegant pointed toe design cut-out sides luxe leather
    lining versatile shoe. Everyday wear or night on the town.`,
    img: "random-products/shampoo.jpg"
  },
  {
    title: 'Tasty Jams',
    description: ` Bodycon skirts bright success colours punchy palette pleated
    must-have new season.`,
    img: "random-products/jams.jpg"
  },
  {
    title: 'Oculus',
    description: ` Some quick example text to build on the card title and make
    up the bulk of the card's content.`,
    img: "random-products/oculus.jpg"
  },
  {
  title: 'Face Wipes',
  description: `Flats elegant pointed toe design cut-out sides luxe leather
  lining versatile shoe. Everyday wear or night on the town.`,
  img: "random-products/facewipes.jpg"
},
{
  title: 'Ear Buds',
  description: `Bodycon skirts bright success colours punchy palette pleated
  must-have new season.`,
  img: "random-products/earbuds.jpg"
}
]


router.get('/', function(req, res, next) {
  if(req.user){
    return paginate(req,res,next)
  }
 return res.render('main/home2' , {data})
});

router.get('/page/:pageNumber' ,(req,res,next) => {
  return paginate(req,res,next)
})
router.get('/fake-cart', (req,res)=> {
  res.render('main/cart')
})

module.exports = router;
