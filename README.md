# StoreManager
A web application that helps store owners manage sales and product inventory  records. 
This application is meant for use in a single store. 

[![Build Status](https://travis-ci.com/Amriesgrace/StoreManager.svg?branch=master)](https://travis-ci.com/Amriesgrace/StoreManager)


## Github Pagess
[Homepage](https://amriesgrace.github.io/)

## Server Side hosted on heroku
[here]()

# Getting Started

### Prequisities

1. Postman
2. Web Browser

### To get this API working on your local browser
1. Node JS
2.Text Editor

### To Install 
1. Clone this repository
``` git clone  ```
2. Run npm install to install dependencies
``` npm install ```
3. Cd into the cloned repo and start the application by running npm start 
``` npm start ```
4. Install postman to test all endpoints on port 8000
5. To test, run npm test
``` npm test```

### Available API routes
- API route to create new product
  * POST: ``` /api/v1/products ```(name, price, quantity, minquantity, maxquantity, imageurl)

- API route to fetch all products
  * GET: ``` /api/v1/products ```

- API route to get single product
  * GET: ``` /api/v1/products:id ```


- API route to edit details on a single product
   * PUT: ``` /api/v1/products:id ```(name, price, quantity, minquantity, maxquantity, imageurl)

- API route to delete a product
  * DELETE: ``` /api/v1/products:id ```

- API route to create new sales record
  * POST: ``` /api/v1/sales ```(productname, description, price, quantity, total)

- API route to fetch all sales records
  * GET: ``` /api/v1/sales ```

- API route to fetch single sales record
  * GET: ``` /api/v1/sales/:id ```

- API route to create new user
  * POST: ``` /api/v1/auth/signup ```(fullname, username, email, password, role)

_ API route to login new user
  * POST: ``` /api/v1/auth/login ```(email, password)

## Author 
Grace Chiamaka

## License 
MIT
