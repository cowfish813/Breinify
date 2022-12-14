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
    } //comment to explain this
            //i => had to reset sort when adding new card
                    //

    useEffect(() => {
        if (data) resetData();
    }, [data]) 

    //SORTING FUNCS
    const maintainSort = (arr) => {
        sortDateFlag ? sortDateASC(arr) : sortDateDESC(arr);
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
            resetData(); //why did i reset my data?
                    //should comment why i did those things
                    //big flag on writing additional comments or documentation
            setSortedData(arr.filter(product => product.productName.indexOf(searchField) > -1));
        } else {
            resetData(); 
            //if i reset data in if/else, just call it above if statement

        }
    }, [searchField])
    
    return (
        <div id='dashboard' className='flex flex-col'>
            <CreateProductCard/>
            <div id='card-container'>
                <button 
                    className='btn btn-primary'                    
                    onClick={() => sortProductCardsByDate()}
                    >
                    Sort Product By Date: {buttonSortDate}
                </button>
                <input 
                    id='search' 

                    placeholder='Seach By Name'
                    onChange={(e) => handleSearch(e)} 
                    type='search'
                    />
                <div id='card-container' className='margin-btm-10 margin-top-20px flex-center flex flex-col'>
                    {sortedData.map(card => <ProductCard data={card} />)}
                                            {/* pass in card.data instead */}
                                            {/* easier to destructure out of props */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;