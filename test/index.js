const chai = require('chai'),
	expect = chai.expect,
	userSVC = require('../services/user');

describe('Unit Test TechMahindra', () => {

	it('Insere usuário', async () => {
		let result = await userSVC.save({
			nome: 'Charlie',
			email: 'charlie@ig.com.br',
			senha: '1234',
			telefones: [ { ddd: '11', numero: '1413414' } ]
		});
		expect(result).to.be.an('Object');
	});

	it('Insere usuário com um ou mais telefones', async () => {
		let result = await userSVC.save({
			nome: 'Charlie2',
			email: 'charlie2@ig.com.br',
			senha: '1234',
			telefones: [ { ddd: '11', numero: '1413414' },{ ddd: '11', numero: '13240914019-134123' } ]
		});
		expect(result).to.be.an('Object');
	});


	it('Insere mesmo e-mail', async () => {
		userSVC
			.save({
				nome: 'Charlie 2',
				email: 'charlie@ig.com.br',
				senha: '14141234',
				telefones: [ { ddd: '11', numero: '1413414' } ]
			})
			.catch((err) => expect(err).to.equal('E-mail já existente'));
	});

	it('Delete user',async()=>{
		await userSVC.delete({email:'charlie@ig.com.br'})
		await userSVC.delete({email:'charlie2@ig.com.br'})
	})
});
