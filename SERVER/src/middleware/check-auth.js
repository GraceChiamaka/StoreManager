import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.secret_key;

const verifyUser = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if(bearerHeader){
		const tokenHeader = bearerHeader.split(' ');
		const token = tokenHeader[1];
		const decoded  = jwt.verify(token, privateKey);
		req.userData = decoded;
		next();
	} else{
		return res.status(401).json({
			message: 'Auth Failed'
		})
	}
};

const isAdmin = (req, res, next) => {
	if(req.userData.role !== 'admin'){
		return res.status(403).json({
			message: 'Only admin can access this'
		})
	}
	next();
};


const UserAuth = {
	verifyUser,
	isAdmin,
}

export default UserAuth;