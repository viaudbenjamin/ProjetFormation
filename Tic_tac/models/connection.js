var mongoose = require('mongoose');

var option = {
    connectTimeoutMS: 5000,
    useUnifiedTopology:true,
    useNewUrlParser:true,
};

var connect = mongoose.connect('mongodb+srv://admin:BJumr3y34MB0mC8d@cluster0-3jn35.azure.mongodb.net/ticettac?retryWrites=true&w=majority',
  option,
  function(err) {
  if (err) {
    console.log(`error, failed to connect to the database because --> ${err}`);
  } else {
    console.info('*** Database Ticketac connection : Success ***');
  }
  }
);
exports.module = connect;