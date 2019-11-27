const passport = require('passport'),
    cfg = require('../jwt'),
    BearerStrategy = require('passport-http-bearer'),
    jwt = require('jsonwebtoken'), 
    userSVC = require('../services/user')

module.exports = function (app) {
    passport.use(new BearerStrategy(async (token, next) => {

        try {
            jwt.verify(token, cfg.jwtSecret)

            let payload = jwt.decode(token)

            if (payload.exp < new Date().getTime()) {
                throw 'Sessão Inválida'
            }

            let user = await userSVC.findId(payload.user.id)

            if (!user) {
                throw '401'
            }
            return next(null, { ...user, id: user.id })
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
        }
    }
}
