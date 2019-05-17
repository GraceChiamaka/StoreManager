import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../../app';

const {expect} = chai;
chai.use(chaiHttp);

describe('/GET products', () => {
	it('should return all products', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: "sansa@gmail.com",
				password: "lady"
			})
			.end((err, res) => {
				const {token} = res.body;
				chai.request(app)
					.get('/api/v1/products')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(200);
						expect(res.body).to.be.a('object');
					})
			});
			done();
	});
});

describe('/GET specific product',() => {
	it('should return product with specific id', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: "sansa@gmail.com",
				password: "lady"
			})
			.end((err, res) => {
				const { token } = res.body;
				chai.request(app)
					.get('/api/v1/products/2')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(200);
						expect(res.body).to.be.a('object');
					});
			});
			done();
	});
});


describe('/POST', () => {
	it('should create a new product', (done) => {
		chai.request(app)
		.post('/api/v1/auth/login')
		.send({
			email: "sansa@gmail.com",
			password: "lady"
		})
		.end((err, res) => {
		const { token } = res.body;
			chai.request(app)
				.post('/api/v1/products')
				.set('accesstoken', token)
				.send({
					name: 'Trendy Shoes',
					quantity: 80,
					minQuantity: 10,
					maxQuantity: 200,
					imageURL: 'https://www.picsum.com'
				})
				.end((error, data) => {
					expect(data).to.have.status(201);
					expect(data.body).to.be.a('object');
				})
		});
		done();
	});
});

describe('/404', () => {
	it('should return 404 error if product is unavailable', (done) => {
		chai.request(app)
			.post('/api/v1/auth/login')
			.send({
				email: "sansa@gmail.com",
				password: "lady"
			})
			.end((err, res) => {
				const { token } = res.body;
				chai.request(app)
					.get('/api/v1/products/10000')
					.set('accesstoken', token)
					.end((error, data) => {
						expect(data).to.have.status(404);
						expect(data.message).to.equal('no product with this id');
					})
			});
			done();
	});
});


describe('/delete', () => {
	it('should delete a specific product', (done) => {
		chai.request(app)
		.post('/api/v1/auth/login')
		.send({
			email: "sansa@gmail.com",
			password: "lady"
		})
		.end((err, res) => {
			const { token } = res.body;
			chai.request(app)
				.delete('/api/v1/products/4')
				.set('accesstoken', token)
				.end((error, data) => {
					expect(data).to.have.status(200);
					expect(data.message).to.equal('Product has been deleted')
				})
		});
		done();
	});
});
