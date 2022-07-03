const {
    token,
    discord_api
} = require('../../config/config')
const fetch = require("got")

const opts = {
    method: "POST",
    body: JSON.stringify ({
        embeds: [{
            'title': "hola",
            'description': 'a'
        }],
    }),
    headers: {
        Authorization: `Bot ${token}`,
    }
}

const djs_message = async (channel_id) => {
    try {
        const res = await fetch(`${discord_api}/channels/${channel_id}/messages`, opts)
        const body = await res.body
        return JSON.parse(body)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    djs_message,

}