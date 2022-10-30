import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';
import CreateProductCard from './createProductCard';
import { fetchCards } from '../../actions/productCardActions';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    const [sortDateFlag, setSortDateFlag] = useState(true);
    const [sortedData, setSortedData] = useState([]);
    const [buttonSortDate, setButtonSortDate] = useState('ASC');
    const [searchField, setSearchField] = useState('');
    const data = useSelector(state => state.productCardReducer.productCards);
    const dispatch = useDispatch();
    
    useEffect(() => { //compdidmount
        dispatch(fetchCards());
    }, [dispatch]) 

    const resetData = () => {
        const arr = [];
        for (let key in data) arr.push(data[key]);
        maintainSort(arr);
    }

    useEffect(() => {
        if (data) resetData();
    }, [data]) 

    //SORTING FUNCS
    const maintainSort = (arr) => {
        if (sortDateFlag) {
            sortDateASC(arr);
        } else {
            sortDateDESC(arr);
        }
    }

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
        for (let key in data) arr.push(data[key]);
        
        if (searchField.length > 0) {
            resetData();
            setSortedData(arr.filter(product => product.productName.indexOf(searchField) > -1));
        } else {
            resetData();
        }
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