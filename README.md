<center> <h1>Blog API</h1> </center>

This repository contains the finished work of the second semester Alt school exam to build a blog api. The blog api allows users to create an acoount, log in, create a blog, fetch all blogs and query them by parameters, fetch a certain blog, update a blog and delete a blog. 

Api docs were made using [Swagger Ui Express](https://www.npmjs.com/package/swagger-ui-express) and can be accessed on /api-docs

<h2> Available Endpoints </h2>

- POST /api/v1/login
- POST /api/v1/register
- GET  /api/v1/blogs
- POST /api/v1/blogs
- GET  /api/v1/blogs/{id}
- PATCH /api/v1/blogs/{id}
- DELETE /api/v1/blogs/{id}
- GET /api/v1/me


<br>
<h2>Usage</h2>

- Clone this repository.
```
$ git clone https://github.com/Adewale66/alt-exam
```
- Install Dependencies.
```
$ npm install
```
- Create .env file and populate using values in .env.example
```
$ touch .env
```
- Run program (dev mode).
```
$ npm run dev
```
- Running tests.
```
$ npm run test
```
- Formatting code.
```
$ npm run format
```
## Author
[Adewale Kujore](https://github.com/Adewale66)
