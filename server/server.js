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

//redis key
const key = 'pcs';
// separate image key for reqs? or maintain urls?

//HELPERS
const fetchDB = async() => {
	console.log('FETCHING');
	return JSON.parse(await client.get(key)) || {};
}

const saveDB = (key, redisDB) => {
	console.log('SAVING');
	client.set(key, JSON.stringify(redisDB));
	console.log('SAVED');
}


// GET
app.get('/get', async (req, res) => {
	const value = await client.get(key);
	res.send({ value: JSON.parse(value) });
});




// POST
// convert image imports
// import fs from 'fs';
// 	// base64 encoding
// // Pipes an image with "new-path.jpg" as the name.

app.post('/newCard', async (req, res) => {
	// fs.writeFileSync("new-path.jpg"); //returns buffer
	
	// fs.writeFileSync("new-path.jpg", buffer);
	// const base64 = fs.readFileSync("path-to-image.jpg", "base64");
	// const buffer = Buffer.from(base64, "base64");
	const redisDB = await fetchDB();
	const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
		productImg: req.body.productImg

    })
	console.log(newCard);
	redisDB[newCard._id] = newCard;
	res.send({ value: redisDB[newCard._id] });
	saveDB(key, redisDB);
})

// PUT
app.put('/:productCard_id', async (req, res) => {
	const id = req.params.productCard_id;
	const redisDB = await fetchDB();
	console.log(id, req.params, req.body);
	if (id in redisDB) {
		const oldData = JSON.stringify(redisDB[id]);
		redisDB[id].productName = req.body.productName || redisDB[id].productImg
		redisDB[id].productImg = req.body.productImg || redisDB[id].productImg
		res.send({ value: (redisDB[id]) });
		console.log('UPDATE SUCCESSFUL =>' , 'Before:', oldData, 'After:', redisDB[id]);
	} else { //DEBUGGER
		console.log('ERROR -> CREATION VIA PUT REQ');
		const newCard = new ProductCard({
			productName: req.body.productName,
			description: 'null',
			productImg: req.body.productImg
		})
		redisDB[newCard._id] = newCard;
		res.send({ value: (redisDB[newCard._id]) });
	}

	saveDB(key, redisDB);
})

// DELETE
app.delete('/:productCard_id', async (req, res) => {
	const id = req.params.productCard_id;
	const redisDB = await fetchDB();

	if (id in redisDB) {
		const deletedContent = redisDB[id];
		res.send({ value: redisDB[id] });
		delete redisDB[id];
		if (!(id in redisDB)) {
			console.log(deletedContent, 'CONTENT DELETED');
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
