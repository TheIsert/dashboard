const {
    token,
    discord_api
} = require('../../config/config')
const fetch = require("got")

const opts_guilds = {
    method: "GET",
    headers: {
        Authorization: `Bot ${token}`,
    }
}

const djs_guilds = async (user_id) => {
    const res = await fetch(`${discord_api}/users/@me/guilds`, opts_guilds)
    const body = await res.body
    return JSON.parse(body)
}
const djs_user = async (user_id) => {
    const res = await fetch(`${discord_api}/users/${user_id}`, opts_guilds)
    const body = await res.body
    return JSON.parse(body)
}
const djs_guild = async (guild_id) => {
    try {
        const res = await fetch(`${discord_api}/guilds/${guild_id}`, opts_guilds)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

const djs_guild_channels = async (guild_id) => {
    try {
        const res = await fetch(`${discord_api}/guilds/${guild_id}/channels`, opts_guilds)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

const djs_guild_users = async (guild_id) => {
    try {
        const res = await fetch(`${discord_api}/guilds/${guild_id}/preview`, opts_guilds)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

const djs_guild_roles = async (guild_id) => {
    try {
        const res = await fetch(`${discord_api}/guilds/${guild_id}/roles`, opts_guilds)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

const djs_getChannel = async (channel_id) => {
    try {
        const res = await fetch(`${discord_api}/channels/${channel_id}`, opts_guilds)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    djs_guild,
    djs_guilds,
    djs_guild_channels,
    djs_guild_users,
    djs_guild_roles,
    djs_getChannel,
    djs_user
}