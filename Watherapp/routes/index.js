var express = require('express');
var router = express.Router();
var request = require('sync-request')
var createVille = require('../model//ville.js')
var creatUser = require('../model/user.js')


/* GET home page. */


router.post('/ajoutVille',async function(req, res, next) {
var doublon = false
var ville =  "https://api.openweathermap.org/data/2.5/weather?q="+req.body.ville+"&appid=0c8d2ec2136d7e01b6729be15e63324c&units=metric&lang=fr"
var result = await request("GET",ville)
var resultJSON = JSON.parse(result.body)
switch(resultJSON.cod){
  case 200:
  var villeList = await createVille.find()  
for(var i=0;i<villeList.length;i++){
  if(req.body.ville.toLowerCase()===villeList[i].nom.toLowerCase()){
    doublon=true
  }
}  
if(doublon!=true){
  var newVille = new createVille({
      nom:resultJSON.name,
      image:"",
      description:resultJSON.weather[0].description,
      temperature_min:resultJSON.main.temp_max,
      temperature_max:resultJSON.main.temp_min,
      longitude:resultJSON.coord.lon,
      latitude:resultJSON.coord.lat,
  })
  await newVille.save();
}
  break;
  case '404':
  existe = true;
  break;
}
  res.redirect('/weather');
});

router.get('/suprimerVille',async function(req, res, next) {
  await createVille.deleteOne(
    {_id:req.query.nom}
  ) 
  res.redirect('/weather');
});

router.get('/update', async function(req, res, next) {
  var villeList = await createVille.find()
  for(var i=0;i<villeList.length;i++){
      var ville =  "https://api.openweathermap.org/data/2.5/weather?q="+villeList[i].nom+"&appid=0c8d2ec2136d7e01b6729be15e63324c&units=metric&lang=fr"
      var result = await request("GET",ville)
      var resultJSON = JSON.parse(result.body) 
      await createVille.updateMany(
        {nom:villeList[i].nom},
        {
        nom:resultJSON.name,
        image:"",
        description:resultJSON.weather[0].description,
        temperature_min:resultJSON.main.temp_max,
        temperature_max:resultJSON.main.temp_min,
        longitude:resultJSON.coord.lon,
        latitude:resultJSON.coord.lat,
        }
      )
  } 
  res.redirect('/weather');
});

router.get('/', function(req, res, next) {
  req.session.passPris = false
  req.session.mauvaisPass = false
  res.render('login', {passPris:req.session.passPris,mauvaisPass:req.session.mauvaisPass});
});

router.get('/weather', async function(req, res, next) {
  
  if(req.session.info===undefined){
    res.redirect('/')
  }else{ 
  var villeList = await createVille.find();
  var doublon = false;
  var existe = false;
  res.render('weather', {villeList,doublon,existe});
  }
  
});

  
  
module.exports = router;
