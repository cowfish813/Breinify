import React, { useState } from 'react';
import UpdateProductCard from './updateProductCard';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../actions/productCardActions';
import { renderModal } from '../../actions/modalActions';

const ProductCard = (props) => { 
    const {createdAt, description, productImg, productName, _id} = props.data
    const dispatch = useDispatch();

    //BUTTONS
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCard(_id));
    } 
    //TO DO
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(renderModal());
    }

    const imageCheck = () => {
        let flag = false;
        const domainNames = ['https://', '.org', '.com', '.net', '.gov', '.mil', '.edu', '//', 'www.'];
        domainNames.forEach(name => { 
            if (productImg.indexOf(name) > -1)flag = true 
        });

        if (flag) {
            return (<img src={productImg}></img>);
        } else {
            //locally stored image?
            return(
                <>
                    Invalid URL: {productImg}
                </>
            );
        }
    }

    return (
        <div>
            <UpdateProductCard data={props.data}/>
            <div>
                {imageCheck()}
                <div>Product Name: {productName}</div>
                <div>Description: {description}</div>
                <div>{createdAt}</div>
                <button onClick={(e) => handleUpdate(e)}>Update</button>
                <button onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>
    )

}

export default ProductCard;