import React, { useState } from 'react';
import axios from 'axios';

const ProductCard = () => { //thread props
    const [productImg, setproductImg] = useState('');
    const [productName, setProductName] = useState('');
    const [desc, setDesc] = useState('');
    const [creationTime, setCreationTime] = useState('');
    const [id, setId] = useState('');


    //BUTTONS
    const handleDelete = (id) => {
        deleteCard(id);
    } 

    const handleUpdate = () => {

    }

    //ACTIONS
    const deleteCard = (_id) => {
        axios.delete(`/${_id}`);
        //error + use case else case works
    }

    const putCard = (id) => {
        axios.put(`${id}`, {
            productName: productName,
            description: productImg,
            // productImg: "hello 0"
        })

    }

    return (
        <div>
            <div>
                <span>{productImg}</span>
                <span>{productName}</span>
                <span>{desc}</span>
                <span>{creationTime}</span>
            </div>
        </div>
    )

}


export default ProductCard;