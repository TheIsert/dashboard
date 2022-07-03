const mongoose = require('mongoose')
const config = require('../config/config')

mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB conectada')
})