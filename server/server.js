import express from 'express';
import bodyParser from 'body-parser';
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

app.get('/', (req, res) => {
	res.send('In the server');
});

const key = 'pcs';

//helpers

//HELPERS
const fetchDB = async() => {
	return JSON.parse(await client.get(key)) || {};
}

const saveDB = (key, redisDB) => {
	client.set(key, JSON.stringify(redisDB));
}


// GET
app.get('/get', async (req, res) => {
	const value = await client.get(key);
	res.send({ value: JSON.parse(value) });
});

// POST
app.post('/newCard', async (req, res) => {
	// const redisDB = JSON.parse(await client.get(key)) || {};
	const redisDB = await fetchDB();
	console.log(Object.keys(redisDB).length, 'before');
	const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
		productImg: req.body.productImg
    })

	redisDB[newCard._id] = newCard;
	saveDB(key, redisDB);
	console.log(Object.keys(redisDB).length, 'After');
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

	saveDB(key, redisDB);
})

// DELETE
app.delete('/:productCard_id', async (req, res) => {
	const id = req.params.productCard_id;
	const redisDB = JSON.parse(await client.get(key));
	console.log(id);

	if (id in redisDB) {
		const deletedContent = redisDB[id];
		delete redisDB[id];
		if (!(id in redisDB)) {
			console.log(deletedContent, 'CONTENT DELETED');
			res.send({ value: JSON.parse(deletedContent) });
		} else {
			console.log('ERROR IN DELETION');
		}
	} else {
		console.log('ERROR: ID NOT FOUND')
	}

	saveDB(key, redisDB);
})

// EXAMPLE
app.get('/getCards', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

app.listen(port, () => console.log(`Running on port: ${port}`));
