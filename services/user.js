const User = require('../models/users'),
    sha512 = require('js-sha512'),
    Guid = require('guid')

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
    }
}

module.exports = userSVC