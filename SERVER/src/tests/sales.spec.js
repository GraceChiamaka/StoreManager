import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../../app';

const {expect} = chai;
chai.use(chaiHttp);

describe('/GET records', () => {
	it('should return all sales records', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: 'kachi@gmail.com',
				password: 'patronum'
			})
			.end((err, res) => {
				const {token} = res.body;
				chai.request(app)
					.get('/api/v1/sales')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(200);
						expect(res.body).to.be.a('object');
					})
			});
			done();
	});
});

describe('/GET specific record',() => {
	it('should return single sales records', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: 'kachi@gmail.com',
				password: 'patronum'
			})
			.end((err, res) => {
				const { token } = res.body;
				chai.request(app)
					.get('/api/v1/sales/:id')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(200);
						expect(res.body).to.be.a('object');
					});
			});
			done();
	});
});

describe('/404', () => {
	it('should return 404 error if a record is unavailable', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: 'kachi@gmail.com',
				password: 'patronum'
			})
			.end((err, res) => {
				const { token } = res.body;
				chai.request(app)
					.get('/api/v1/sales/10000')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(404);
						expect(data.message).to.equal('you have no records with this id');
					})
			});
			done();
	});
});
describe('/POST new record', () => {
	it('should create a new sales record', (done) => {
		chai.request(app)
		.post('/api/v1/auth/login')
		.send({
			email: 'kachi@gmail.com',
			password: 'patronum'
		})
		.end((err, res) => {
			const { token } = res.body;
			chai.request(app)
				.post('/api/v1/sales')
				.set('accesstoken', token)
				.send({
					productName: 'item 1',
					descriptiom: 'this item 1',
					price: 250,
					quantity: 3,
					total: 750
				})
				.end((error, data) => {
					expect(data).to.have.status(201);
					expect(data.body).to.be.a('object');
				})
		});
		done();
	});
});