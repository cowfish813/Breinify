import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';
import CreateProductCard from './createProductCard';
import { fetchCards } from '../../actions/productCardActions';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    // const [sortNameFlag, setSortNameFlag] = useState(true);
    // const [buttonSortName, setButtonSortName] = useState('ASC');
    const [sortDateFlag, setSortDateFlag] = useState(true);
    const [sortedData, setSortedData] = useState([]);
    const [buttonSortDate, setButtonSortDate] = useState('ASC');
    const [searchField, setSearchField] = useState('');
    const data = useSelector(state => state.productCardReducer.productCards);
    const [unsortedData, setunsortedData] = useState('');
    const dispatch = useDispatch();

    useEffect(() => { //compdidmount
        dispatch(fetchCards());
    }, [dispatch]) 

    const resetData = () => {
        const arr = [];
        for (let key in data) {
            arr.push(data[key]);
        }
        setunsortedData(arr);
        sortDateASC(arr);
    }

    useEffect(() => {
        if (data) {
            resetData();
        }
    }, [data]) //Load sorted Array

    //SORTING FUNCS
    const sortProductCardsByDate = () => {
        setSortDateFlag(!sortDateFlag);
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

    useEffect(() => { //DATE
        if (sortDateFlag && data) { //sort by creation date
            sortDateASC(sortedData);
        } else if (!sortDateFlag && data){
            sortDateDESC(sortedData);
        }
    }, [sortDateFlag])

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchField(value);
    }

    useEffect(() => {
        const arr = [];
        for (let key in data) {
            arr.push(data[key]);
        }
        
        if (searchField.length > 0) {
            resetData();
            setSortedData(arr.filter(product => product.productName.indexOf(searchField) > -1));
        } else {
            resetData();
        }
        console.log(sortedData.length,unsortedData.length)
    }, [searchField])
    

    return (
        <div>
            <CreateProductCard/>
            <div id='card-container'>
                <button onClick={() => sortProductCardsByDate()}>Sort Product By Date: {buttonSortDate}</button>
                <input id='search' onChange={(e) => handleSearch(e)} type='search'></input>
                {sortedData.map(card => <ProductCard data={card} />)}
            </div>
        </div>
    )
}

export default (Dashboard);