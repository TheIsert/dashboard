const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    discordId: String,
    username: String,
    guilds: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("usuarioDashboard", Schema);
