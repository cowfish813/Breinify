import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';

import mongoose from 'mongoose';

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

app.get('/', (req, res) => {
	res.send('In the server');
});
console.dir(redis)

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
	await client.set('productCards', JSON.stringify(ProductCard.find()));
	const value = await client.get('productCards');
	res.send({ value: JSON.parse(value) });
});

// POST
app.post('/newCard', (req, res) => {
	const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
        productImg: req.body.productImg
    })

	newCard.save()
		.then(card => {
			res.json(card)
			console.log('Created At', card.createdAt)
		})
		.catch(err => res.status(404).json(err))
	console.log(newCard);
})

// PUT
app.put('/:productCard_id', (req, res) => {
	const id = req.params.productCard_id;

	ProductCard.findById({_id: id}, (err, doc) => {
		if (err) {
			console.log(err, doc);
			const newCard = new ProductCard({
				productName: req.body.productName,
				description: req.body.description,
				productImg: req.body.productImg
			})

			console.log(newCard, 'New User');

			newCard.save()
				.then(card => {
					res.json(card)
					console.log('Created At', card.createdAt)
				})
				.catch(err => res.status(404).json(err))
		} else {
			ProductCard.findByIdAndUpdate({_id: id}, {
				productName: req.body.productName,
				description: req.body.description,
				productImg: req.body.productImg
			})
			.catch(err => res.status(404).json(err))
		}
	})

})

// DELETE
app.delete('/:productCard_id', (req, res) => {
	const id = req.params.productCard_id;
	ProductCard.findOneAndDelete({_id: id})
		.then(card => res.json({_id: card._id}))
		.catch(err => res.status(404).json(err))
})

// EXAMPLE
app.get('/getCards', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

app.listen(port, () => console.log(`Running on port: ${port}`));
