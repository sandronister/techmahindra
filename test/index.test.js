const chai = require('chai'),
	expect = chai.expect,
	userSVC = require('../services/user'),
	chaiHttp = require('chai-http'),
	app = require('../server/index')

chai.use(chaiHttp)

describe('Unit Test TechMahindra', () => {

	var userId = null
	var token = null

	it('Insere usuário', async () => {
		let result = await userSVC.save({
			nome: 'Charlie',
			email: 'charlie@ig.com.br',
			senha: '1234',
			telefones: [{ ddd: '11', numero: '1413414' }]
		});
		expect(result).to.be.an('Object');
		userId = result.id
	});

	it('Insere usuário com um ou mais telefones', async () => {
		let result = await userSVC.save({
			nome: 'Charlie2',
			email: 'charlie2@ig.com.br',
			senha: '1234',
			telefones: [{ ddd: '11', numero: '1413414' }, { ddd: '11', numero: '13240914019-134123' }]
		});
		expect(result).to.be.an('Object');
	});


	it('Insere mesmo e-mail', async () => {
		try {
			await userSVC
				.save({
					nome: 'Charlie 2',
					email: 'charlie@ig.com.br',
					senha: '14141234',
					telefones: [{ ddd: '11', numero: '1413414' }]
				})
		} catch (err) {
			expect(err).to.be.equal('E-mail já existente')
		}

	});

	it('Login inválido', async () => {
		try {
			await userSVC.login({ email: 'charlie@ig.com.br', senha: '909090' })
		} catch (err) {
			expect(err).to.be.equal('Usuário e/ou senha inválidos')
		}
	})

	it('Login válido', async () => {
		let user = await userSVC.login({ email: 'charlie@ig.com.br', senha: '1234' })
		expect(user).to.be.an('Object')
	})

	it('Busca usuário por id', async () => {
		let user = await userSVC.findId(userId)
		expect(user).to.be.an('object')
	})

	

	it('Signup Route',  (done) => {
		chai.request(app)
			.post('/signup') 
			.send({
				nome: 'Tango',
				email: 'tango@ig.com.br',
				senha: 'foxtrot',
				telefones: [{ ddd: '11', numero: '1214312-1234' }]
			}).end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                done()
            })
	})

	it('Signup Route Repeat Mail',  (done) => {
		chai.request(app)
			.post('/signup') 
			.send({
				nome: 'Tango',
				email: 'tango@ig.com.br',
				senha: 'foxtrot',
				telefones: [{ ddd: '11', numero: '1214312-1234' }]
			}).end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body.message).to.be.equals('E-mail já existente')
                done()
            })
	})

	it('Sigin Route',  (done) => {
		chai.request(app)
			.post('/sigin') 
			.send({
				email: 'tango@ig.com.br',
				senha: 'foxtrot',
			}).end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
				token = res.body.token
                done()
            })
	})

	it('Sigin Route Fail',  (done) => {
		chai.request(app)
			.post('/sigin') 
			.send({
				email: 'tango@ig.com.br',
				senha: 'quebec',
			}).end((err, res) => {
                expect(res).to.have.status(401)
                expect(res.body.message).to.be.equals('Usuário e/ou senha inválidos')
                done()
            })
	})

	it('Busca usuário não autenticado',(done)=>{
		chai.request(app)
			.get(`/search/${userId}`)
			.end((err,res)=>{
				expect(res).to.have.status(401)
				done()
			})
	})

	it('Busca usuário',(done)=>{
		chai.request(app)
			.get(`/search/${userId}`)
			.set('Authorization', `Bearer ${token}`)
			.end((err,res)=>{
				expect(res).to.have.status(200)
				expect(res.body).to.be.an('Object')
				done()
			})
	})

	it('Delete user', async () => {
		await userSVC.delete({ email: 'charlie@ig.com.br' })
		await userSVC.delete({ email: 'charlie2@ig.com.br' })
		//await userSVC.delete({ email: 'tango@ig.com.br' })
	})
});
