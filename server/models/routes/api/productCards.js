// import express from 'express';
const express = require('express');
const router = express.Router();
// import ProductCard from '../../productCard';
const ProductCard = require('../../productCard');

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

router.post('/', (rew, res) => {
    const newCard = new ProductCard({
        productName: req.body.productName,
        description: req.body.description,
        productImg: req.body.productImg
    });
})

router.delete('/', (req, res) => {

})

module.exports = router;
// export default router;