const mongose = require('mongoose'),
	db = require('../config'),
	Schema = mongose.Schema

const userSchema = new Schema({
	id:String,
	nome: String,
	email: String,
	senha: String,
	telefones: [ { ddd: String, numero: String } ],
	data_criacao: { type: Date, default: Date.now },
	data_atualizacao: {type:Date,default:null},
	ultimo_login: {type:Date,default:Date.now},
	token: {type:String,default:null}, 
	status_code:{type:String,default:'De acordo'}
})

module.exports = db.model('users', userSchema)
