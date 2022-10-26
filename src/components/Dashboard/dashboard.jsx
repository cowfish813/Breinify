import React, { useState, useEffect } from 'react';
import ProductCard from './product';

import axios from 'axios';

const Dashboard = () => {
    //axios call stuff
	// axios.get('/get')
	// 	.then(res => console.log(res))

    axios.post('/newCard', {
        productName: "hello there",
        description: "hello there",
        productImg: "hello there"
    })
		
    //render all the product cards
    return (
        <div>
            dashboard is working
        </div>
    )
}

export default Dashboard;