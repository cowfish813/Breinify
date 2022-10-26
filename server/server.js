import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';


import ProductCard from './models/productCard.js';
import Ioredis from 'ioredis';
const redisIo = new Ioredis();
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

app.get('/', (req, res) => {
	res.send('In the server');
});

const key = 'pcs';
// GET
// app.get('/get', (req, res) => {
// 	// console.log(res, 'res')
//     ProductCard.find()
//         .then(cards => {
// 			console.log(res.json(cards))
// 			res.json(cards)
// 		})
//         .catch(err => res.status(404).json(err))
// })

app.get('/get', async (req, res) => {
	// await client.set('productCards', JSON.stringify(ProductCard.find()));
	// const value = await client.get('productCards');
	// console.log(value);
	// res.send({ value: JSON.parse(value) });
	const value = client.get(key);
	res.send({ value: JSON.parse(value) });
});


// POST
app.post('/newCard', async (req, res) => {
	const redisDB = JSON.parse(await client.get(key)) || {};

	const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
		productImg: req.body.productImg
    })
	redisDB[newCard._id] = newCard;
	console.log(redisDB)
	client.set(key, JSON.stringify(redisDB))
})

// PUT
app.put('/:productCard_id', async (req, res) => {
	const id = req.params.productCard_id;
	const redisDB = JSON.parse(await client.get(key)) || {};

	if (id in redisDB) {
		redisDB[id].productName = req.body.productName
		redisDB[id].description = req.body.description
		redisDB[id].productImg = req.body.productImg || redisDB[id].productImg
	} else {
		const newCard = new ProductCard({
			productName: req.body.productName,
			description: req.body.description,
			productImg: req.body.productImg
		})
		redisDB[newCard._id] = newCard;
	}
	console.log(redisDB, 'db');
	client.set(key, JSON.stringify(redisDB));
})

// DELETE
app.delete('/:productCard_id', async (req, res) => {
	const id = req.params.productCard_id;
	const redisDB = JSON.parse(await client.get(key));

	delete redisDB[id];

	client.set(key, JSON.stringify(redisDB));
})

// EXAMPLE
app.get('/getCards', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

app.listen(port, () => console.log(`Running on port: ${port}`));
