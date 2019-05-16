import express from 'express';
import bodyParser from 'body-parser';

import Routes from './SERVER/src/routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', Routes);

// send 404 error to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});
// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});

export default app;
