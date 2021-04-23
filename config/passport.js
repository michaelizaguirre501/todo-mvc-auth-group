
// This is all magic.
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const mongoose = require('mongoose') // importing mongoose
const config = require('../config/config') 
const User = require('../models/User') // importing User Schema

module.exports = function (passport) {
  passport.use(
    new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('auth: ', profile)
        const newUser = {
          microsoftId: profile.oid,
          displayName: profile.displayName,
        }

        try {
          // Finding user in our database.
          let user = await User.findOne({ microsoftId: profile.oid }) // find a user in your datatbase with the microsoft id

          if (user) {
            done(null, user)// if user exists youre ok
          } else {
            user = await User.create(newUser)//if user doesnt exist make new user object in database
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // Stores the user.id in the session
  passport.serializeUser((user, done) => {
    done(null, user.id)  //stores user as serilized data in session
  })

  // Pull the user from the browser's cookie
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))//reads the stoed data from above
  })
}
