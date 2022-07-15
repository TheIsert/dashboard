require("dotenv").config();

module.exports = {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope:["identify", "guilds", "bot"],
  token: process.env.token,
  mongo: process.env.mongo,
  discord_api: process.env.discordApi,
  secret: process.env.secret || "dashboard"
};
