import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../actions/productCardActions';
import { renderModal } from '../../actions/modalActions';
import { formatDate } from '../../util/util';

const ProductCard = (props) => { 
    const {createdAt, description, productImg, productName, _id} = props.data;
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCard(_id));
    } 

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(renderModal(_id));
    }

    return (
        <div id='prod-card' className='card-border margin-top-20px mid flex flex-col flex-center'>
            <h1 className=''>Product Name: {productName}</h1>
            <div className='flex'>
                <img className='pic' src={productImg}></img>
            </div>

            <div className='margin-top-20px flex flex-col'>
                <p>Description: {description}</p>
                <p>{createdAt}</p>
                <p>{formatDate(createdAt)}</p>
            </div>

            <div id='btn-container' className='flex flex-center'>
                <button id='' className='button blue' onClick={(e) => handleUpdate(e)}>Update</button>
                <button id='' className='red button' onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>        
    )
}

export default ProductCard;