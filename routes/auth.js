const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()

//Handles logins 
router.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      
        resourceURL: config.resourceURL,    
        customState: 'my_state',            
        failureRedirect: '/' 
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('Login was called in the Sample');
    res.redirect('/todos');
});

router.get('/openid/return', //microsoft magic. allows us check if were logged in.
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/todos');
  });

router.post('/openid/return',//sets route for responding to a post
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/todos');
  });


router.get('/logout', function(req, res){ //ends session
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

module.exports = router// exports this
