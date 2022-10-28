import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';
import CreateProductCard from './createProductCard';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [sortDateFlag, setSortDateFlag] = useState(true);
    const [sortNameFlag, setSortNameFlag] = useState(true);
    const [sortedData, setSortedData] = useState([]);
    const [buttonSortDate, setButtonSortDate] = useState('ASC');
    const [buttonSortName, setButtonSortName] = useState('ASC');

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
            sortNameASC(arr);
        }
    }, [data]) //Load sorted Array

    //SORTING FUNCS
    const sortProductCardsByDate = () => {
        setSortDateFlag(!sortDateFlag);
    }
    const sortProductCardsByName = () => {
        setSortNameFlag(!sortNameFlag);
    }

    const sortNameASC = (arr) => {
        setButtonSortName('ASC');
        arr.sort((a,b) => {return (a.productName < b.productName ? -1 : (a.productName > b.productName) ? 1 : 0)});
        setSortedData(arr);
    }

    const sortNameDESC = (arr) => {
        setButtonSortName('DESC');
        arr.sort((a,b) => (a.productName > b.productName ? -1 : (a.productName < b.productName) ? 1 : 0));
        setSortedData(arr);
    }

    const sortDateASC = (arr) => {
        setButtonSortDate('ASC');
        arr.sort((a,b) => (a.createdAt < b.createdAt ? -1 : (a.createdAt > b.createdAt) ? 1 : 0));
        setSortedData(arr);
    }

    const sortDateDESC = (arr) => {
        setButtonSortDate('DESC');
        arr.sort((a,b) => (a.createdAt > b.createdAt ? -1 : (a.createdAt < b.createdAt) ? 1 : 0));
        setSortedData(arr);
    }

    useEffect(() => { // NAME
        if (sortNameFlag && data) { //sort by creation date
            sortNameASC(sortedData);
        } else if (!sortNameFlag && data){
            sortNameDESC(sortedData);
        }
    }, [sortNameFlag])

    useEffect(() => { //DATE
        if (sortDateFlag && data) { //sort by creation date
            sortDateASC(sortedData);
        } else if (!sortDateFlag && data){
            sortDateDESC(sortedData);
        }
    }, [sortDateFlag])

    // ACTIONS
    const fetchCards = async () => {
        const res = await axios.get('/get');
        await setData(res.data.value); //reset for redux
    }



    return (
        <div>
            <CreateProductCard/>
            <div id='card-container'>
                <button onClick={() => sortProductCardsByDate()}>Sort Product By Date: {buttonSortDate}</button>
                <button onClick={() => sortProductCardsByName()}>Sort Product By Name: {buttonSortName}</button>
                {sortedData.map(card => <ProductCard data={card} />)}
            </div>
        </div>
    )
}

export default Dashboard;