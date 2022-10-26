import express from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
import redis from 'redis';

import ProductCard from './models/productCard.js';
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

// app.use('api/productCards', productCards)

app.get('/', (req, res) => {
	res.send('In the server');
});


// GET
app.get('/get', (req, res) => {
    ProductCard.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(404).json(err))
})

// POST
app.post('/newCard', (req, res) => {
	const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
        productImg: req.body.productImg
    })
	console.log(newCard);

	newCard.save()
		.then(card => res.json(card))
		.catch(err => res.status(404).json(err))
})

// PUT
app.put('/', (req, res) => {

})

// DELETE
app.delete('/:question_id', (req, res) => {
	ProductCard.fubdIbeAbdDekete({_id: req.params.productCard._id})
		.then(card => res.json({_id:card._id}))
		.catch(err => res.status(404).json(err))
})

// EXAMPLE
app.get('/getCardsss', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

app.listen(port, () => console.log(`Running on port: ${port}`));
