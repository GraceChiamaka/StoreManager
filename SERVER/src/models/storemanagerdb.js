import db from './db';

const createdb = () => {
	const queryStr = 'CREATE IF NOT EXISTS DATABASE storemanagerdb';
	db.query(queryStr)
		.then(res => { console.log('database created', res)})
		.catch(e => setImmediate(() => { throw e }))
}

const createProducts = () => {
	const queryStr = `CREATE TABLE IF NOT EXISTS products(
		id SERIAL PRIMARY KEY,
		name character varying(50) NOT NULL,
		price integer NOT NULL,
		description text NOT NULL,
		quantity integer NOT NULL,
		min_quantity integer NOT NULL,
		max_quantity integer NOT NULL,
		image_url text NOT NULL
	)`;
	
	db.query(queryStr)
		.then(res => { console.log('products table created', res)})
		.catch(e => setImmediate(() => { throw e }))

};
const createUsers = () => {
	const queryStr = `CREATE TABLE IF NOT EXISTS users(
		id serial PRIMARY KEY,
		fullname character varying(50) NOT NULL,
		username text NOT NULL,
		email varchar(320),
		password varchar(60) NOT NULL,
		role character varying NOT NULL
	)`;
	db.query(queryStr)
		.then(res => { console.log('users table created', res)})
		.catch(e => setImmediate(() => { throw e }))
};

const createSalesRecords = () => {
	const queryStr = `CREATE TABLE IF NOT EXISTS records(
		id serial PRIMARY KEY,
		product_id INTEGER REFERENCES products (id),
		product_name text NOT null,
		price INTEGER NOT NULL,
		quantity INTEGER NOT NULL,
		total INTEGER NOT NULL
	)`;
	db.query(queryStr)
		.then(res => { console.log('sales records table created', res)})
		.catch(e => setImmediate(() => { throw e }))
};

const dropUsers = () => {
	const queryStr = 'DROP TABLE users';
	db.query(queryStr)
		.then(res => { console.log('users table deleted', res)})
		.catch(e => setImmediate(() => { throw e.message }));
};
const dropProducts = () => {
	const queryStr = 'DROP TABLE products CASCADE';
	db.query(queryStr)
		.then(res => { console.log('products table deleted', res)})
		.catch(e => setImmediate(() => { throw e.message }))
};
const dropSales = () => {
	const queryStr = 'DROP TABLE records CASCADE';
	db.query(queryStr)	
		.then(res => { console.log('sales table deleted', res)})
		.catch(e => setImmediate(() => {throw e.message }))
}
const endConnection = ()=>{
	pool.end();
}


// createdb();
// dropProducts();
// dropSales()
createProducts();
createUsers();
//createSalesRecords();

endConnection();