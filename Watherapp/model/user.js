var mongoose = require('mongoose');

var UserBdd = mongoose.Schema({
    username:String,
    email:String,
    password:String,

})

var createUser = mongoose.model('userList',UserBdd)

module.exports = createUser;

