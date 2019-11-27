const express = require('express'),
    router = express.Router(),
    userService = require('../services/user')

router.post('/signup',async(req, res, next) => {
    try {
       let user = await userService.save(req.body)
       res.send(user)
    } catch (e) {
        return next(e)
    }
})

module.exports = router