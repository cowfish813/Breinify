import React, { useState } from 'react';

import axios from 'axios';

const ProductCard = (props) => { //thread props
    const {createdAt, description, productImg, productName, _id} = props.data

    const updateCard = () => {
        //summon modal on button press
    }

    //BUTTONS
    const handleDelete = (e) => {
        e.preventDefault();
        deleteCard(_id);
    } 

    const handleUpdate = (e) => {
        e.preventDefault();
        updateCard(_id);
    }

    //ACTIONS
    const deleteCard = (id) => {
        axios.delete(`/${id}`);
    }


    return (
        <div>
            <div>
                <div>{productImg}</div>
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