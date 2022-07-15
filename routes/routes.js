const { Router } = require("express");
const passport = require("../server/passport");
const { auth, isNotAuth } = require("../util/middleware/auth");
const { djs_user } = require("../util/api/djs_guild");
const router = Router();

router.get("/", async (req, res) => {
  const userDjs = await djs_user(req.user.discordId);
  res.render("home", {
    auth: auth,
    userDjs: userDjs,
  });
});

router.get("/comandos", (req, res) => {
  res.render("comandos");
});

router.get("/actualizaciones", (req, res) => {
  res.render("novedades");
});
router.get("/votar", (req, res) => {
  res.render("votar");
});

router.get(
  "/login",
  isNotAuth,
  passport.authenticate("discord"),
  (req, res) => {
    res.redirect("/dash");
  }
);

router.use("/", require("./dash.routes"));

module.exports = router;
