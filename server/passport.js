const passport = require("passport");
const { Strategy } = require("passport-discord");
const User = require("../util/models/user");
const {
  clientID,
  clientSecret,
  callbackURL,
  scope,
} = require("../config/config");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: callbackURL + "/login",
      scope,
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ discordId: profile.id });

        if (user) return done(null, user);

        const newUser = new User({
          discordId: profile.id,
          username: profile.username,
          guilds: profile.guilds,
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
