var mongoose = require('mongoose');

var option = {
    connectTimeoutMS: 5000,
    useUnifiedTopology:true,
    useNewUrlParser:true,
};

var connect = mongoose.connect('mongodb+srv://admin:T@t@depoulpe82645@cluster0-87zrc.mongodb.net/Weather?retryWrites=true&w=majority',
    option,
    function(err){
        console.log(err);
    }
);

exports.module = connect;