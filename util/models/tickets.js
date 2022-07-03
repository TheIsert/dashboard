const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    guildID: String,
    channelLogs: String,
    rolSoporte: String,
    crearTicket: String
})

module.exports = mongoose.model('dashboardTickets', Schema)