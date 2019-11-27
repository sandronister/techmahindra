const express = require('express'),
    bodyParses = require('body-parser'),
    morgan = require('morgan'),
    logger = require('../services/logger'),
    passport = require("../services/auth"),
    db = require('../config'),
    helmet = require('helmet'),
    cors = require('cors'), 
    userRoute = require('../routers/user')

const app = express()

app.use(helmet())
app.use(cors())

app.disable('x-powered-by')

app.use(bodyParses.urlencoded({ extended: true }))
app.use(bodyParses.json())
app.use(morgan('common', {
    stream: {
        write: function (message) {
            logger.info(message)
        }
    }
}))


const auth = passport(app)
app.use(auth.initialize())

app.use('/',userRoute)

module.exports = app
