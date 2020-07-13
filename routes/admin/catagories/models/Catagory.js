const mongoose = require('mongoose')


const CatagorySchema = new mongoose.Schema({
    name: {type: String, unique: true , lowercase: true , required: true }
})

module.exports = mongoose.model('Category' , CatagorySchema)