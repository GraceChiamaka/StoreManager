import db from './db';

const createdb = () => {
	const queryStr = 'CREATE DATABASE storemanagerdb';
	db.query(queryStr)
		.then(res => { console.log('database created', res)})
		.catch(e => setImmediate(() => { throw e }))
}

const createProducts = () => {
	const queryStr = `CREATE TABLE IF NOT EXISTS products(
		id serial PRIMARY KEY,
		name character varying(50) NOT NULL,
		price integer NOT NULL,
		quantity integer NOT NULL,
		minquantity integer NOT NULL,
		maxquantity integer NOT NULL,
		imageurl text NOT NULL
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
		productname character varying(50) NOT NULL,
		description text NOT NULL,
		price integer NOT NULL,
		quantity integer NOT NULL,
		total integer NOT NULL
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
	const queryStr = 'drop TABLE products';
	db.query(queryStr)
		.then(res => { console.log('products table deleted', res)})
		.catch(e => setImmediate(() => { throw e.message }))
};


createdb();
createProducts();
createUsers();
createSalesRecords();
// dropProducts();