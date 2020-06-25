var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js')

/*-------------------------gestion des compte de compte--------------------------*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/* creation du compte */
router.post('/sign-up',async function(req, res, next) {
    if(req.body.name!='' && req.body.username!='' && req.body.email!='' && req.body.password!=''){
      var userList = await userModel.findOne({
        email:req.body.email
      })
      if(userList!=null){
        res.redirect('/')
      }else{
        var newUser = userModel({
          name:req.body.name,
          firstname:req.body.firstname,
          email:req.body.email,
          password:req.body.password
        })
        await newUser.save()
        req.session.info=[userList._id,userList.email]
        res.redirect('/')
      }
    }else{
      res.redirect('/login')
    }
  });
  
  /* connection du compte */
  router.post('/sign-in',async function(req, res, next) {
  var userList = await userModel.findOne({
        email:req.body.email,
        password:req.body.password
      })
      if(userList!=null){
        req.session.info=[userList._id,userList.email]
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    res.redirect('/')
  });
  
  /* deconection du compte */
  router.get('/logout', function(req, res, next) {
    req.session.info= undefined
    res.render('login', );
  });
  
  /* ----------------------fin de gestion de compte--------------------------- */

module.exports = router;
