const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    titre: String,
    description:String,
    url:String,
    user:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],


})

const articleModel = mongoose.model('articles', articleSchema)

module.exports = articleModel