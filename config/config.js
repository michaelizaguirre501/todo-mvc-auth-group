exports.creds = {
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', 

    clientID: 'ee7e48d9-883d-4602-99cd-9a3bc5f1d310',//registers app with microsoft
  
    clientSecret: 'I78-1.6z9F-M~FmamBftGW0hNd6EdT405a', //app password from microsoft
  
    responseType: 'code id_token', //responds with token to verify identity
  
    responseMode: 'form_post', // 
  
    redirectUrl: 'https://todo-mvc-auth-group.mizaguirre.repl.co/auth/openid/return', //lets azure know where to send an authenticated user
  
    allowHttpForRedirectUrl: true, // 
  
    validateIssuer: false, // 
  
    issuer: null,
  
    passReqToCallback: false,
  
    useCookieInsteadOfSession: false,
  
    cookieEncryptionKeys: [ 
      { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
      { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
    ],
  
    scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  
    loggingLevel: false,
  
    nonceLifetime: null, 
  
    nonceMaxAmount: 5,
  
    clockSkew: null,
  };
  
  exports.destroySessionUrl = 'https://todo-mvc-auth-group.mizaguirre.repl.co';// lets azure know where to send a non authenticated user
  
  exports.useMongoDBSessionStore = false;
  
  exports.databaseUri = 'mongodb://localhost/OIDCStrategy';
  
  exports.mongoDBSessionMaxAge = 24 * 60 * 60;  //sets max time a sessions is active
  