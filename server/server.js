// import express from 'express';
const express = require('express');
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
// import redis from 'redis';
const redis = require('redis');
// import productCards from './models/routes/api/productCards.js';
const productCards = require('./models/routes/api/productCards')

/**
 * Connect to redis
 */
const client = redis.createClient();
await client.connect();
client.on('connect', function (err) {
	if (err) {
		console.log('Could not establish a connection with Redis. ' + err);
	} else {
		console.log('Connected to Redis successfully!');
	}
});

const app = express();
const port = 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/productCards', productCards)

app.get('/', (req, res) => {
	res.send('In the server');
});


// GET
// POST
// PUT
// DELETE

// EXAMPLE
// app.get('/getCards', async (req, res) => {
// 	// Please finish the logic in retrieving the cards from redis
// 	await client.set('key', JSON.stringify({ hello: 'world' }));
// 	const value = await client.get('key');
// 	res.send({ value: JSON.parse(value) });
// });

app.listen(port, () => console.log(`Running on port: ${port}`));
