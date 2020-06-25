var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var  uid2  = require ('uid2') ;
var userModel = require('../models/users')
var articleModel=require('../models/article')

router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var salt = uid2(32)
  var token =''
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      salt:salt,
      token:uid2(32)
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }


  res.json({result, saveUser, error,token})
})

router.post('/sign-in', async function(req,res,next){
  var result = false
  var user = null
  var error = []
  var token = ''
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }
  if(error.length == 0){
    const user =  userModel.findOne({
      email: req.body.emailFromFront,
      /* password: req.body.password */
    }).exec(function (err,user) {
          var hash = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);
          if (hash === user.password) {
              result = true
              token = user.token
          res.json({result, user, error,token}) 
          } else {
          error.push('email ou mot de passe incorrect')
          res.json({result, user, error}) 
          }
        })
  }
})
router.post('/add_article', async function(req,res,next){
const data = await articleModel.findOne({
  titre:req.body.titre,
})

if(data !=null){
  console.log(1)
      
}else{
  var newArticle = new articleModel({
      titre: req.body.titre,
      description: req.body.description,
      url: req.body.url,
    /*   user:Iduser, */
    }) 
    await newArticle.save()
}

  res.json({result:true})
})
router.get('/get_article', async function(req,res,next){
  var article = await articleModel.find({
   /*  user:req.query.user */
  })

    res.json({result:true,article})
  })
  router.delete('/suppr_article/:titre', async function(req,res,next){
    console.log(1,req.params.titre)
  await articleModel.deleteOne({
      titre:req.params.titre,
    })
  
      res.json({result:true})
    })
  

module.exports = router;
