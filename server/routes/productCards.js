import express from 'express';
const router = express.Router();
import ProductCard from '../../productCard';

// router.get('/getCards', (req, res) => {
//     ProductCard.find()
//         .then(cards => res.json(cards))
//         .catch(err => res.status(404).json(err))
// })

router.get('/getCardsss', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	await client.set('key', JSON.stringify({ hello: 'world' }));
	const value = await client.get('key');
	res.send({ value: JSON.parse(value) });
});

router.post('/', (req, res) => {
    const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
        productImg: req.body.productImg,
    });
})

router.delete('/', (req, res) => {

})

export const questions = router