const User = require('../models/users'),
    sha512 = require('js-sha512'),
    Guid = require('guid'),
    jwt = require('jsonwebtoken'),
    cfg = require('../jwt')

const userSVC = {
    save: async (obj) => {
        let user = await userSVC.find(obj)

        if (user) {
            throw 'E-mail já existente'
        }

        obj.id = Guid.create()
        obj.senha = sha512(obj.senha)
        let newUser = new User(obj)
        return await newUser.save()
    },
    find: async (query) => {
        let obj = await User.findOne({ 'email': query.email })
        return obj
    },
    delete: async (query) => {
        let obj = await userSVC.find(query)
        obj.delete()
    },
    login: async (query) => {
        query.senha = sha512(query.senha)
        let user = await User.findOne({ 'email': query.email, 'senha': query.senha })

        if (!user) {
            throw 'Usuário e/ou senha inválidos'
        }

        user.ultimo_login = Date.now()

        user.token = jwt.sign({ user: user, exp: Math.floor(new Date().getTime()) + 7 * 30 * 60 * 100 }, cfg.jwtSecret, { algorithm: 'HS512' })
        await user.save()
        return user
    },
    findId: async (id) => {
        let user = await User.findOne({ 'id': id })

        if(!user){
            throw 'Usuário não encontrado'
        }

        return user
    }
}

module.exports = userSVC