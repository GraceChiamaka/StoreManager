import db from '../models/db';


const createProduct = (req, res) =>{
	const queryStr = `INSERT INTO products(name, quantity, price, description, minquantity, maxquantity, imageurl)
						VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
	const queryText = 'SELECT * FROM products where name = $1';
	const reqName = req.body.name;
	const values = [
		req.body.name,
		req.body.quantity,
		req.body.price,
		req.body.desc,
		req.body.minQuantity,
		req.body.maxQuantity,
		req.body.imageURL
	];
	db.query(queryText, [reqName])
		.then(result => {
			if(result.rowCount > 0){
				return res.status(400).json({
					status: 400,
					message: 'Product already exists'
				});
			} else {
				db.query(queryStr, values, (err, response) => {
					if(err){
						console.log(err.message)
					}
					return res.status(201).json({
						status: 201,
						data: response.rows
					})
				});
			}
		})
		.catch(e => setImmediate(() => { throw e.message }))
}

const getProducts = (req, res) => {
	const queryStr = 'SELECT * FROM products';

	db.query(queryStr)
		.then(result =>{
			if(result.rowCount === 0){
				return res.status(404).json({
					status: 404,
					message: 'you have no products'
				});
			}
			return res.status(200).json({
				status: 200,
				data: result.rows
			});
		})
		.catch(e => setImmediate(() => { throw e.message }));
}

const getProduct = (req, res) => {
	const queryStr = 'SELECT * FROM products where id = $1';
	const reqId = req.params.id;

	db.query(queryStr, [reqId])
		.then(result => {
			if(result.rowCount > 0){
				return res.status(200).json({
					status: 200,
					data: result.rows
				});
			}
			return res.status(404).json({
				status: 404,
				message: 'no product with this id'
			});
		})
		.catch(e => setImmediate(() => { throw e.message }) );
}

const editProduct = (req, res) => {
	const reqId = req.params.id;
	const queryStr = `UPDATE products SET 
		name = $1, 
		quantity = $2, 
		price = $3,
		minquantity = $4, 
		maxquantity = $5, 
		imageurl = $6
		WHERE id = $7 returning *`;
	const values = [
		req.body.name,
		req.body.quantity,
		req.body.price,
		req.body.minQuantity,
		req.body.maxQuantity,
		req.body.imageURL,
		req.params.id
	];
	
	db.query(queryStr, values)
		.then(result => {
			return res.status(200).json({
			status: 200,
			data: result.rows[0]
		})
		.catch(e => setImmediate(() => {throw e.message}))
		})
}

const deleteProduct = (req, res) => {
	const queryStr = 'DELETE FROM products where id = $1';
	const reqId = req.params.id;
	db.query(queryStr, [reqId])
		.then(result => {
			if (result.rowCount > 0) {
				return res.status(200).json({
					status: 200,
					message: 'Product has been deleted'
				});
			}
			return res.status(404).json({
				status: 404,
				message: 'product does not exist'
			});
		})
		.catch(e => setImmediate(() => { throw e.message }))
}





const Products = {
	createProduct,
	getProducts,
	getProduct,
	editProduct,
	deleteProduct,

}

export default Products;