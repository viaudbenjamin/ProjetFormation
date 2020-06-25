var express = require('express');
var router = express.Router();
var request = require('sync-request')
var creatUser = require('../model/user.js')

router.post('/sign-up', async function(req, res, next) {
  console.log("1")
  if(req.body.username!='' && req.body.email!= '' && req.body.password!=''){

    var userList = await creatUser.findOne({
      email: req.body.email,
    })
      console.log(userList)
      if(userList!=null){
            req.session.passPris= true;
            req.session.mauvaisPass= false;
            res.render('login',{passPris:req.session.passPris,mauvaisPass:req.session.mauvaisPass});
            
            }else{ 
              var newUser = creatUser({
              username:req.body.username,
              email:req.body.email,
              password:req.body.password,
            })
            await newUser.save();
              req.session.info = [newUser._id,newUser.username];
              res.redirect('/weather');
            }
    
  }else{
    res.redirect('/');
  }
});
router.post('/sign-in', async function(req, res, next) {
  console.log('1')
  var userList = await creatUser.findOne(
    {email: req.body.email,password:req.body.password}
  )
     
    
      if(userList!=null)
        {
          req.session.info = [userList._id,userList.username]
          res.redirect('/weather');
        }else{
            req.session.passPris= false
            req.session.mauvaisPass= true
            res.render('login',{mauvaisPass:req.session.mauvaisPass,passPris:req.session. passPris});
            
        }
  
});
router.get('/logout',function(req,res,next){
  req.session.info = undefined
  res.redirect('/');
})
module.exports = router;
