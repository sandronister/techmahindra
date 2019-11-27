const express = require('express'),
    router = express.Router(),
    userService = require('../services/user'), 
    app = require('../server')
    auth = require('../services/auth')(app)

router.post('/signup',async(req, res, next) => {
    try {
       let user = await userService.save(req.body)
       res.status(201).send(user)
    } catch (e) {
        return res.status(400).send({message:e})
    }
})

router.post('/sigin',async(req, res, next) => {
    try {
       let user = await userService.login(req.body)
       res.send(user)
    } catch (e) {
        return res.status(401).send({message:e})
    }
})

router.get('/search/:id',auth.authenticate(),async(req,res,next)=>{
    try{
        let user = await userService.findId(req.params.id)
        res.send(user)
    }catch(e){
        return res.status(400).send({message:e})
    }
})

module.exports = router