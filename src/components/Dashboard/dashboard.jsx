import React, { useState, useEffect } from 'react';
import ProductCard from './product';

import axios from 'axios';
import CreateProductCard from './createProductCard';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [sorted, setSorted] = useState(true);
    const [sortedData, setSortedData] = useState([]);
    const [buttonSortLabel, setButtonSortLabel] = useState('ASC');

        //axios call stuff
	// axios.get('/get')
	// 	.then(res => console.log(res, 'res'))
    
    
    useEffect(() => { //compdidmount
        fetchCards();
    }, []) 

    useEffect(() => {
        const arr = [];
        if (data) {
            for (let key in data) {
                const ele = {key: data[key]}
                arr.push(data[key]);
            }
        }
        arr.sort()
        setSortedData(arr);
    }, [data]) //Load sorted Array

    useEffect(() => {
        if (sorted) { //sort by creation date
            // ASC sort
            setButtonSortLabel('ASC');
        } else {
            //DESC sort
            setButtonSortLabel('DESC');
        }
    }, [sorted]) //after button press

    //SORTING FUNCS
    const sortProductCards = () => {
        setSorted(!sorted)
    }
    
    // ACTIONS
    const fetchCards = async () => {
        const res = await axios.get('/get');
        await setData(res); //reset for redux
        await console.log(res, 'loaded');
    } //working so far

    // useEffect(() => {
    //     console.log(data, 'data');
    // },[data])
    
    // console.log(fetchCards());
    //render all the product cards
    return (
        <div>
            dashboard is working
            <CreateProductCard/>
            {/* {sortedData.map() all the Product card} */}
            <button>Sort Product {}</button>
            <ProductCard/>
        </div>
    )
}

export default Dashboard;