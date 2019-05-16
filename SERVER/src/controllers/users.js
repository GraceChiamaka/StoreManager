import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../models/db';

dotenv.config();

const privateKey = process.env.secret_key;


const createUser = (req, res) => {
    const queryStr = 'INSERT INTO users(fullname, username, email, password, role) VALUES($1, $2, $3, $4, $5) returning *';
    const queryText = 'SELECT * FROM users where email = $1';
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body.password);
    const values = [
        req.body.fullName,
        req.body.userName,
        req.body.email,
        hashedPassword,
        req.body.role
    ];
    const reqEmail = req.body.email;


    db.query(queryText, [reqEmail])
        .then(result => {
            if (result.rowCount > 0) {
                return res.status(409).json({
                    status: 409,
                    message: 'user already exists'
                });
            }
            db.query(queryStr, values)
                .then(response => {
                    return res.status(201).json({
                        status: 201,
                        data: response.rows
                    })
                })
                .catch(err => setImmediate(() => { throw err.message; }))
        })
        .catch(e => setImmediate(() => { throw e.message; }));
};

const loginUser = (req, res) => {
    const queryText = 'SELECT * FROM users where email = $1';
    const reqEmail = req.body.email;
    const reqPass = req.body.password;

    db.query(queryText, [reqEmail])
        .then((result) => {
            const compPassword = result.rows[0].password;
            const isPassword = bcrypt.compareSync(reqPass, compPassword);
            const token = jwt.sign({
                email: result.rows[0].email,
                userId: result.rows[0].id,
                role: result.rows[0].role,
            }, privateKey, { expiresIn: '1d' });
            if (result.rowCount > 0) {
                if (!isPassword) {
                    return res.status(401).json({
                        status: 401,
                        message: 'Auth failed wrong password'
                    });
                }
                return res.status(201).json({
                    status: 201,
                    message: 'Auth successfull',
                    token,
                });
            }

            return res.status(409).json({
                status: 409,
                message: 'user with this email not found'
            });
        })
        .catch(e => setImmediate(() => { throw e.message; }));
};


const Users = {
    createUser,
    loginUser,
};

export default Users;
