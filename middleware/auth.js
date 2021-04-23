//Checks to see if the user signed in.


module.exports = {
    ensureAuth: function (req, res, next) {   //creating a function called ensureAuth
      if (req.isAuthenticated()) {            //
        return next()                         
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }
  