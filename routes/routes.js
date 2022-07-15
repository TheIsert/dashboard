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

router.get("/comandos", async (req, res) => {
  const userDjs = await djs_user(req.user.discordId);
  res.render("comandos",{
    userDjs: userDjs,
  });
});

router.get("/actualizaciones",async (req, res) => {
  const userDjs = await djs_user(req.user.discordId);
  res.render("novedades",{
    userDjs: userDjs,
  });
});
router.get("/votar", async (req, res) => {
  const userDjs = await djs_user(req.user.discordId);
  res.render("votar",{
    userDjs: userDjs,
  });
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
