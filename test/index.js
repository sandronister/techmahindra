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

	it('Insere mesmo e-mail', async () => {
		userSVC
			.save({
				nome: 'Charlie 2',
				email: 'charlie@ig.com.br',
				senha: '14141234',
				telefones: [ { ddd: '11', numero: '1413414' } ]
			})
			.catch((err) => expect(err).to.equal('Usuário já existente'));
	});
});
