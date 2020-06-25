var express = require('express');
var router = express.Router();
var journeyModel = require('../models/train.js')
var orderModel = require('../models/order.js')
var userModel = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/recherche', function(req, res, next) {
  
  if(req.session.info===undefined){
    res.redirect('/')
  }else{
    res.render('homepage', );
  }
  
});
/* -------------------recherche des voyage dispo */
router.post('/result',async function(req, res, next) {

  function Majuscule(chaine){
    return chaine.substr(0,1).toUpperCase()+	chaine.substr(1,chaine.length).toLowerCase()
  }
console.log(req.body.date)
var voyageList = await journeyModel.find({
  departure:Majuscule(req.body.villeDepart),
  arrival:Majuscule(req.body.villeArriver),
  date:req.body.date,
})

if(voyageList.length===0){
  res.render('test')
}else{
  res.render('available', { voyageList});
}
});



/* ------------------affichage du resultat de la recherche */
router.get('/commande',async function(req, res, next) {
var train = await journeyModel.findOne({
    _id:req.query.id
  })

  req.session.commande.push({
    price:train.price,
    train:req.query.id,
    date:train.date,
    depart:train.departureTime,
    villedepart:train.departure,
    villearriver:train.arrival,
})

    res.render('tickets', { command:req.session.commande});

});
/* ----------------------creation de la commande */
router.get('/confirmationCommande',async function(req, res, next) {
  
var idTrain = []
for(var i=0;i<req.session.commande.length;i++){
  idTrain.push(req.session.commande[i].train)
}
var newCommande = orderModel({
  total:req.query.total,
  train:idTrain,
  userId:req.session.info[0].id
})
await newCommande.save()
req.session.commande=[] 
res.redirect('/recherche');
});

/* ------------affichage des commandes de l'utilisateur connecté */
router.get('/last-commande',async function(req, res, next) {
var commandeList = await orderModel.find({
  userId:req.session.info[0].id
}).populate('train').exec()

  res.render('last_trips', { commandeList });
})
/*-------------------------gestion des compte de compte--------------------------*/

/* creation du compte */
router.post('/sign-up',async function(req, res, next) {
    if(req.body.name!='' && req.body.username!='' && req.body.email!='' && req.body.password!=''){
      var userList = await userModel.findOne({
        email:req.body.email
      })
      if(userList!=null){
        res.redirect('/recherche')
      }else{
        var newUser = userModel({
          name:req.body.name,
          firstname:req.body.firstname,
          email:req.body.email,
          password:req.body.password
        })
        await newUser.save()
        userList = await userModel.findOne({
          email:req.body.email
        })
        req.session.info=[{
          id:userList._id,
          email:userList.email}]
        req.session.commande=[]
        
        res.redirect('/recherche')
      }
    }else{
      res.redirect('/')
    }
  });
  
  /* connection du compte */
  router.post('/sign-in',async function(req, res, next) {
  var userList = await userModel.findOne({
        email:req.body.email,
        password:req.body.password
      })
      if(userList!=null){
        req.session.info=[{
          id:userList._id,
          email:userList.email}]
        req.session.commande=[]
        res.redirect('/recherche')
      }else{
        res.redirect('/')
      }
  });
  
  /* deconection du compte */
  router.get('/logout', function(req, res, next) {
    req.session.info= undefined
    req.session.commande=undefined
    res.redirect('/', );
  });
  
  /* ----------------------fin de gestion de compte--------------------------- */































// ---------------------Save BDD -----------------------------------------------------
/* // useNewUrlParser ;)
var options = {
connectTimeoutMS: 5000,
useNewUrlParser: true,
useUnifiedTopology: true
};


mongoose.connect('mongodb+srv://XXXXXXXX:*********@XXXXXXXX-0hsfc.mongodb.net/Ticketac?retryWrites=true',
  options,
  function(err) {
  if (err) {
    console.log(`error, failed to connect to the database because --> ${err}`);
  } else {
    console.info('*** Database Ticketac connection : Success ***');
  }
  }
);

var journeySchema = mongoose.Schema({
departure: String,
arrival: String,
date: Date,
departureTime: String,
price: Number,
});

var journeyModel = mongoose.model('journey', journeySchema); 

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"] 


// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

// How many journeys we want
var count = 300

// Save  ---------------------------------------------------
  for(var i = 0; i< count; i++){

  departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
  arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

  if(departureCity != arrivalCity){

    var newUser = new journeyModel ({
      departure: departureCity , 
      arrival: arrivalCity, 
      date: date[Math.floor(Math.random() * Math.floor(date.length))],
      departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
      price: Math.floor(Math.random() * Math.floor(125)) + 25,
    });
      
      await newUser.save();

  }

}
res.render('index', { title: 'Express' });
});
 */
// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
/* router.get('/result', function(req, res, next) {

// Permet de savoir combien de trajets il y a par ville en base
for(i=0; i<city.length; i++){

  journeyModel.find( 
    { departure: city[i] } , //filtre

    function (err, journey) {

        console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
    }
  )

}
res.render('index', { title: 'Express' });
}); */
/* -------------------------fin de Save BDD---------------------------- */





module.exports = router;
