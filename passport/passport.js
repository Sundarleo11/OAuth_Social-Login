const passport = require("passport");


const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: "821440983185-1ce5095qffs6l54nv98p1p91fic81bf3.apps.googleusercontent.com",
        clientSecret: "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",
       // callbackURL: "http://localhost:4000/auth/google/callback",
        callbackURL: "http://localhost:4000/auth/google/callback"
      },
      (accessToken, refreshToken, profile, next)=>{
          //callback
          console.log("User Profile",profile)
      }
      )
      
);
