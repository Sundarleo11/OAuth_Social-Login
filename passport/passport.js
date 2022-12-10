const passport = require("passport");
const User = require("../model/user");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: "821440983185-1ce5095qffs6l54nv98p1p91fic81bf3.apps.googleusercontent.com",
      clientSecret: "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",
      // callbackURL: "http://localhost:4000/auth/google/callback",
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("MY PROFILE", profile._json.email);
      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("User already exits in DB", user);
          next(null, user);
          // cookietoken()
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email
          })
            .then((user) => {
              console.log("New User", user);
              next(null, user);
              // cookietoken()
            })
            .catch((err) => console.log(err));
        }
      });

      //   next();
    }
  )
);

