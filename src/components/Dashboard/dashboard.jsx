import React, { useState, useEffect } from 'react';
import ProductCard from './product';

import axios from 'axios';

const Dashboard = () => {
    //axios call stuff
	axios.get('/getCards')
		.then(res => console.log(res))
		
    //render all the product cards
    return (
        <div>
            dashboard is working
        </div>
    )
}

export default Dashboard;