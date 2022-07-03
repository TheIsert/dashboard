const { mongo, secret } = require("../config/config");
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("./passport");
const MongoStore = require("connect-mongo");
const path = require("path");
const app = express();

app
  .set("port", process.env.PORT || 80)
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: mongo,
      }),
      cookie: {
        maxAge: 60000 * 60 * 24
      }
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .set("views", path.join(__dirname, "../views"))
  .set("view engine", ".hbs")
  .engine(".hbs", hbs({ extname: ".hbs" }))
  .use((req, res, next) => {
    app.locals.user = req.user;
    next();
  })
  .use("/", require("../routes/routes"));

module.exports = app;
