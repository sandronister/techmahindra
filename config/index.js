const mongoose = require('mongoose')

let mongoURL = (process.env.NODE_ENV != 'TEST')? process.env.MONGOURL:'mongodb://localhost:27017/sky'

mongoose.connect(mongoURL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
}, function () {
	console.log('connect db')
})

mongoose.Promise = global.Promise

module.exports = mongoose.connection