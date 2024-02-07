const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/userModel')

const GOOGLE_CLIENT_ID = '586001436683-fubu6sch74b52ea1hl8d1a5epcvgrqoh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8001/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = await User.create({ googleId: profile.id, name: profile.displayName, email: profile.email, refreshToken: refreshToken,token:accessToken });
        return done(null, newUser);
      }
    } catch (err) {
      return done(err);
    }
  }
));
passport.serializeUser(function(user,done) {
    done(null,user);
});

passport.deserializeUser(function(user,done) {
    done(null,user);
});