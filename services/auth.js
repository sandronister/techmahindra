const passport = require('passport')
const cfg = require('../jwt')
const BearerStrategy = require('passport-http-bearer')
const jwt = require('jsonwebtoken')

module.exports = function (app) {
    passport.use(new BearerStrategy(async (token, next) => {

        try {
            jwt.verify(token, cfg.jwtSecret)

            let payload = jwt.decode(token)

            if (payload.exp < new Date().getTime()) {
                throw 'Sessão Inválida'
            }

            const conn = app.persistence.connection

            const userDAO = new app.persistence.usersDAO(conn)
            let user = await userDAO.getUser(payload.user)


            if (!user.length) {
                throw '401'
            }
            return next(null, { ...user[0], id: user[0].id_usuario })
        } catch (error) {
            console.error(error)
            return next(null, false)
        }
    }))

    return {
        initialize() {
            return passport.initialize()
        },
        authenticate() {
            return passport.authenticate('bearer', cfg.jwtSession)
        },
        sigfoxAuth() {
            return function (req, res, next) {
                const token = req.headers.token

                if (token != process.env.SIGFOX_TOKEN) {

                    res.status(403).json({
                        status: 403,
                        message: 'FORBIDEN'
                    })
                }
                next()
            }
        }
    }
}
