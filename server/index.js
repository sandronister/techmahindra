const express = require('express'),
    bodyParses = require('body-parser'),
    morgan = require('morgan'),
    logger = require('../services/logger'),
    passport = require("../services/auth"),
    db = require('../config')
    helmet = require('helmet'),
    cors = require('cors')

const app = express()

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use(helmet())
app.use(cors())

app.disable('x-powered-by')

app.use(bodyParses.urlencoded({ extended: true }))
app.use(bodyParses.json())
app.use(morgan("common", {
    stream: {
        write: function (message) {
            logger.info(message)
        }
    }
}))


const auth = passport(app)
app.use(auth.initialize())

module.exports = app
