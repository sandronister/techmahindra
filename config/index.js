const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/sky', {
    useUnifiedTopology: true, 
    useNewUrlParser: true 
},function(){
    console.log('connect db')
});

mongoose.Promise = global.Promise;

module.exports = mongoose.connection;