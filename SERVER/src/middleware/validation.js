const validateNewProduct = (req, res, next) => {
	const body = req.body;
	if(!body.name || !body.desc || !body.imageURL){
		return res.status(401).json({
			status: 401,
			message: 'one of your parameters does not have a value'
		});
	}
	if(body.price < 1 || body.price > 100000){
		return res.status(401).json({
			status: 401,
			message: 'price is out of range'
		})
	}
	if(typeof body.price === 'string' || typeof body.quantity || typeof body.minQuantity || typeof body.maxQuantity){
		return res.status(401).json({
			status: 401,
			message: 'price, quantity, maxQuantity, minQuantity must be a number'
		})
	}
	if(body.imageURL === ""){
		return res.status(401).json({
			status:401,
			message:'you need to have an image'
		})
	}
	next();
}

const validation ={
	validateNewProduct
};

export default validation;