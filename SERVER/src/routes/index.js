import express from 'express';
import Products from '../controllers/products';
import Records from '../controllers/sales';
import Users from '../controllers/users';
import Validation from '../middleware/validation';
import UserAuth from '../middleware/check-auth';

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Welcome to the store manager app');
});


router.post('/api/v1/products', Validation.validateNewProduct, UserAuth.verifyUser, UserAuth.isAdmin, Products.createProduct);
router.get('/api/v1/products', UserAuth.verifyUser, Products.getProducts)
router.get('/api/v1/products/:id', UserAuth.verifyUser, Products.getProduct);
router.put('/api/v1/products/:id', UserAuth.verifyUser, UserAuth.isAdmin, Products.editProduct);
router.delete('/api/v1/products/:id', UserAuth.verifyUser, UserAuth.isAdmin, Products.deleteProduct);

// sales routes
router.post('/api/v1/sales', UserAuth.verifyUser, UserAuth.isAdmin, Records.createRecord);
router.get('/api/v1/sales', UserAuth.verifyUser, UserAuth.isAdmin, Records.getRecords);
router.get('/api/v1/sales/:id', UserAuth.verifyUser, UserAuth.isAdmin, Records.getRecord);

// users routes

router.post('/api/v1/auth/signup', UserAuth.verifyUser, UserAuth.isAdmin, Users.createUser);
router.post('/api/v1/auth/login', Users.loginUser);


export default router;