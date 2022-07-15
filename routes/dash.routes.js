const { Router } = require("express");
const { auth } = require("../util/middleware/auth");
const {
  djs_guild,
  djs_guilds,
  djs_guild_channels,
  djs_guild_users,
  djs_guild_roles,
  djs_getChannel,
  djs_user,
} = require("../util/api/djs_guild");
const ticketModel = require("../util/models/tickets");
const { djs_message } = require("../util/api/djs_message");
const router = Router();

router.get("/dash/logout", auth, function (req, res, next) {
  if (req.user)
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

router.get("/dash", auth, async (req, res) => {
  let id = req.params.id;

  const userDjs = await djs_user(req.user.discordId);

  let servidores = [];

  const userGuilds = req.user
    .get("guilds")
    .filter((guild) => (guild.permissions & 0x20) === 0x20);

  for (const key in userGuilds) {
    servidores.push({
      id: userGuilds[key].id,
      name: userGuilds[key].name,
      icon: userGuilds[key].icon,
    });
  }

  res.render("dash", {
    user: req.user,
    userDjs: userDjs,
    servidores,
  });
});

router.get("/dash/:id", auth, async (req, res) => {
  let id = req.params.id;
  let servidor = await djs_guild(id);
  const channels = await djs_guild_channels(id);
  const users = await djs_guild_users(id);
  const userDjs = await djs_user(req.user.discordId);

  res.render("servidor", {
    user: req.user,
    servidor,
    servidorID: servidor.id,
    boost: servidor.premium_subscription_count,
    canales: channels.length,
    roles: servidor.roles.length,
    sticker: servidor.stickers.length,
    emojis: servidor.emojis.length,
    users: users.approximate_member_count,
    userDjs: userDjs,
  });
});

router.get("/dash/:id/bienvenidas", auth, async (req, res) => {
  let id = req.params.id;
  const userDjs = await djs_user(req.user.discordId);
  let servidor = await djs_guild(id);
  res.render("bienvenidas", {
    user: req.user,
    servidor,
    servidorID: servidor.id,
    userDjs: userDjs,
  });
});

router.get("/dash/:id/tickets", auth, async (req, res) => {
  let id = req.params.id;
  let servidor = await djs_guild(id);
  const userDjs = await djs_user(req.user.discordId);
  
  let servidores = [];
  let guilds = await djs_guilds();

  const channels = await djs_guild_channels(id);
  const canales = channels
    .filter((c) => c.type == "0")
    .map((a) => ({
      id: a.id,
      name: a.name,
    }));

  const rol = await djs_guild_roles(id);
  const roles = rol.map((a) => ({
    id: a.id,
    name: a.name,
  }));
  for (const key in guilds) {
    servidores.push({
      id: guilds[key].id,
      name: guilds[key].name,
      icon: guilds[key].icon,
      
    });
  }

  ticketModel.findOne(
    {
      guildID: id,
    },
    async (err, docs) => {
      if (docs) {
        const channelTickets = await djs_getChannel(docs.crearTicket);
        const rolSoporte = docs.rolSoporte;

        if (docs.channelLogs) {
          const channelLogs = await djs_getChannel(docs.channelLogs);
          res.render("tickets", {
            user: req.user,
            servidor,
            servidorID: servidor.id,
            servidores,
            canales: canales,
            roles: roles,
            channelNameTickets: channelTickets.name,
            rolNameSoporte: rolSoporte,
            channelNameLogs: channelLogs.name,
            userDjs: userDjs,
          });
        } else {
          res.render("tickets", {
            user: req.user,
            servidor,
            servidorID: servidor.id,
            servidores,
            canales: canales,
            roles: roles,
            channelNameTickets: channelTickets.name,
            rolNameSoporte: rolSoporte,
            channelNameLogs: "Selecciona un canal...",
            userDjs: userDjs,
          });
        }
      } else {
        res.render("tickets", {
          user: req.user,
          servidor,
          servidorID: servidor.id,
          servidores,
          canales: canales,
          roles: roles,
          channelNameTickets: "Selecciona un canal...",
          rolNameSoporte: "Selecciona un rol...",
          channelNameLogs: "Selecciona un canal...",
          userDjs: userDjs,
        });
      }
    }
  );

  router.post("/dash/:id/ticket", auth, async (req, res) => {
    let id = req.params.id;
    let channel = req.body.crearticket;
    let rol = req.body.rolSoporte;
    let channelLogs = req.body.channelLogs;

    let guild = await ticketModel.findOne({
      guildID: id,
    });

    if (!guild) {
      const saveGuildConfig = new ticketModel({
        guildID: id,
        channelLogs: channelLogs,
        rolSoporte: rol,
        crearTicket: channel,
      });

      saveGuildConfig.save((err, db) => {
        if (err) console.log(err);
      });
    } else {
      await ticketModel.updateOne({
        guildID: id,
        channelLogs: channelLogs,
        rolSoporte: rol,
        crearTicket: channel,
      });
    }
    //res.redirect('tickets')
  });
});

module.exports = router;
