import db from '../models/db';

const createRecord = (req, res) => {
	const queryStr = `INSERT INTO records(productname, description, price, quantity, total)
			VALUES($1, $2, $3, $4, $5) returning *`;
	const values = [
		req.body.productName,
		req.body.description,
		req.body.price,
		req.body.quantity,
		req.body.total
	];
	db.query(queryStr, values, (err, result) => {
		if(err){
			return res.status(401).json({
				status: 401,
				message: err.message
			});
		}
		return res.status(201).json({
			status: 201,
			data: result.rows
		});
	});
};

const getRecords = (req, res) => {
	const queryStr = 'SELECT * FROM records';
	db.query(queryStr)
		.then(result => {
			if(result.rowCount > 0){
				return res.status(200).json({
					status: 200,
					data: result.rows
				});
			}
			return res.status(404).json({
				status:404,
				message: 'you have no sales records'
			});
		})
		.catch(e => setImmediate(() => { throw e.message }))
}

const getRecord = (req, res) => {
	const queryStr = 'SELECT * FROM records where id = $1';
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
				message: 'You have no records with this id'
			});
		})
		.catch(e => setImmediate(() => {throw e.message}))
}


const Records = {
	createRecord,
	getRecords,
	getRecord,
}

export default Records;