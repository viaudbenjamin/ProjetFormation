var express = require('express');
var router = express.Router();
var uniquid= require('uniqid')
var cloudinary = require('cloudinary').v2;
const fs = require('fs')
const request =  require('sync-request')
const subscriptionKey = 'ad43b46b22874e9ab68eb5607e654cdd'
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'




cloudinary.config({ 
  cloud_name: 'dxpdknucj', 
  api_key: '611856999626648', 
  api_secret: 'L9U0uToXw9J9qiK0JZiAaSh0K6k' 
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({result:true,message:"fichier telechargé"});
});



router.post('/upload',async function(req, res, next) {

  var nomPhoto = './tmp/'+uniquid()+'.jpg'
  var files = await req.files.photo.mv(nomPhoto)

  if(!files){
    var resultCloudinary = await cloudinary.uploader.upload(nomPhoto)

    const imageUrl =resultCloudinary.secure_url;
    const params = {
      'returnFaceId': 'true',
      'returnFaceLandmarks': 'false',
      'returnFaceAttributes': 'age,gender,glasses,facialHair,emotion,hair'
    };
    const option = {
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
    };
    var reconnaissanceVisage = request('POST',uriBase,option)
    var reponse = JSON.parse(reconnaissanceVisage.getBody())
    var optionVisage = {lunette:false,barbe:false,sourir:false,age:reponse[0].faceAttributes.age,gender:reponse[0].faceAttributes.gender,hairColor:reponse[0].faceAttributes.hair.hairColor[0].color}
    if(reponse[0].faceAttributes.glasses!='NoGlasses'){
      optionVisage.lunette = true
    } 
    if (reponse[0].faceAttributes.facialHair.beard>0.5){
      optionVisage.barbe = true
    } 
    if (reponse[0].faceAttributes.emotion.happiness>0.7){
      optionVisage.sourir = true
    }
    if (reponse[0].faceAttributes.hair.happiness>0.7){
      optionVisage.sourir = true
    }
    res.json({result:true,image:resultCloudinary,optionVisage})
  }else{
    res.json({result:false,message:files})
  }
  fs.unlinkSync(nomPhoto)
});



module.exports = router;
