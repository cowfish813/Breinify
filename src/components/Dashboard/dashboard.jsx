import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';

import axios from 'axios';
import CreateProductCard from './createProductCard';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [sorted, setSorted] = useState(true);
    const [sortedData, setSortedData] = useState([]);
    const [buttonSortLabel, setButtonSortLabel] = useState('ASC');

    useEffect(() => { //compdidmount
        fetchCards();
    }, []) 

    useEffect(() => {
        if (data) {
            const arr = [];
            for (let key in data) {
                // const ele = {key: data.data.value[key]}
                arr.push(data[key]);
            }
            sortASC(arr);
        }
    }, [data]) //Load sorted Array

    //SORTING FUNCS
    const sortProductCards = () => {
        setSorted(!sorted)
    }

    const sortASC = (arr) => {
        setButtonSortLabel('ASC');
        arr.sort((a,b) => (a.createdAt) - (b.createdAt));
        setSortedData(arr);
        console.log(arr, 'asc');
    }

    const sortDESC = (arr) => {
        setButtonSortLabel('DESC');
        arr.sort((a,b) => (b.createdAt) - (a.createdAt));
        setSortedData(arr);
        console.log(arr, 'desc');
    }

    useEffect(() => {
        // console.log(data, sortedData, 'sorted')
        if (sorted && data) { //sort by creation date
            // ASC sort
            sortASC(sortedData);
        } else if (!sorted && data){
            //DESC sort
            sortDESC(sortedData);
        }
    }, [sorted]) //after button press
    
    // ACTIONS
    const fetchCards = async () => {
        const res = await axios.get('/get');
        await setData(res.data.value); //reset for redux
        // await console.log(res.data.value, 'loaded');
    } //working so far

    // useEffect(() => {
    //     console.log(data, 'data');
    // },[data])
    
    // console.log(fetchCards());
    //render all the product cards
    return (
        <div>
            <CreateProductCard/>
            <div id='card-container'>
                <button onClick={() => sortProductCards()}>Sort Product in: {buttonSortLabel}</button>
                {sortedData.map(card => <ProductCard data={card} />)}
            </div>
        </div>
    )
}

export default Dashboard;