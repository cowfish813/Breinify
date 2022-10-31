import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from '../../actions/productCardActions';
import { renderModal, unRenderModal } from '../../actions/modalActions';
// import moment from 'moment/moment';

const ProductCard = (props) => { 
    const {createdAt, description, productImg, productName, _id} = props.data;
    const isModalOpen = useSelector(state => state.modalReducer.modal);
    // const date;
    // const date = createdAt.getDate()
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCard(_id));
    } 

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(renderModal(_id));
    }

    const handleCancelUpdate = e => {
        e.preventDefault();
        dispatch(unRenderModal());
    }

    const buttonSwitch = () => {
        if (isModalOpen) {
            return (<button id='' className='button blue' onClick={(e) => handleCancelUpdate(e)}>Cancel Update</button>)
        } else {
            return (<button id='' className='button blue' onClick={(e) => handleUpdate(e)}>Update</button>)
        }
    }

    return (
        <div id='card-container' className='border margin-top-20px mid flex flex-col flex-center'>
            <h1 className=''>Product Name: {productName}</h1>
            <div className='flex'>
                <img className='pic' src={productImg}></img>
            </div>

            <div className='margin-top-20px flex flex-col'>
                <p>Description: {description}</p>
                <p>{createdAt}</p>
            </div>

            <div id='btn-container' className='flex flex-center'>
                {buttonSwitch()}
                <button id='' className='red button' onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>        
    )

}

export default ProductCard;