const User = require('../models/users'), 
    sha512 = require('js-sha512')

const userSVC = {
    save:async(obj)=>{
        let user = await userSVC.find(obj)

        if(user){
            throw 'Usuário já existente'
        }


        obj.senha = sha512(obj.senha)
        let newUser = new User(obj)
        return await newUser.save()
    }, 
    find:async(query)=>{
        let obj = await User.findOne({'email':query.email})
        return obj
    }
}

module.exports = userSVC