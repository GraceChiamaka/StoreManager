import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
	if(err){
		console.log('db connection err', err.stack);
	} else {
		console.log('connected to db');
	}
});


export default pool;