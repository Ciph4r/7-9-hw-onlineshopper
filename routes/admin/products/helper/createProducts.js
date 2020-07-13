const Category = require('../../catagories/models/Catagory')
const Product = require('../models/Products')
const {waterfall} = require('async')
const faker = require('faker')

const addProduct = (name) => {
    return new Promise((resolve , reject)=>{
        waterfall([
            callback => {
                Category.findOne({name: name}, (err , category) => {
                    if(err) reject(err)
                    callback(null , category)
                })
            },
            (category) => {
                for (let i = 0 ; i < 24 ; i++){
                    const product = new Product()
                    product.category = category._id
                    product.name = faker.commerce.productName()
                    product.price = faker.commerce.price()
                    product.image = `/images/products2/${i}.jpg`
                    product.description = faker.lorem.paragraph()
                    product.save().then((product) => {
                        console.log(product)
                        resolve(product)
                    })
                    .catch((err) => reject(err))
                }
            }
        ])
    })
}

module.exports = addProduct