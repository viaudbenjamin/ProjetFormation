var mongoose = require('mongoose');

var VilleBdd = mongoose.Schema({
    nom:String,
    image:String,
    description:String,
    temperature_min:Number,
    temperature_max:Number,
    longitude:Number,
    latitude:Number,
})

var createVille = mongoose.model('villeList',VilleBdd)

module.exports = createVille;

