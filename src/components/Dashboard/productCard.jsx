import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from '../../actions/productCardActions';
import { renderModal, unRenderModal } from '../../actions/modalActions';

const ProductCard = (props) => { 
    const {createdAt, description, productImg, productName, _id} = props.data
    const isModalOpen = useSelector(state => state.modalReducer.modal);
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
            return (<button onClick={(e) => handleCancelUpdate(e)}>Cancel Update</button>)
        } else {
            return (<button onClick={(e) => handleUpdate(e)}>Update</button>)
        }
    }

    return (
        <div>
            <div>
                <img src={productImg}></img>
                <div>Product Name: {productName}</div>
                <div>Description: {description}</div>
                <div>{createdAt}</div>
                {buttonSwitch()}
                <button onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>
    )

}

export default ProductCard;