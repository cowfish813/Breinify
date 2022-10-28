import React, { useState } from 'react';
import UpdateProductCard from './updateProductCard';
import axios from 'axios';

const ProductCard = (props) => { //thread props
    const [updateModalShow, setUpdateModalShow] = useState(<></>);
    const {createdAt, description, productImg, productName, _id} = props.data

    //BUTTONS
    const handleDelete = (e) => {
        e.preventDefault();
        deleteCard(_id);
    } 
    //TO DO
    const handleUpdate = (e) => {
        e.preventDefault();
        //useEffectHook for global modal variable
            //this function here will set the flag
                //modal component will reset flag
        setUpdateModalShow(<UpdateProductCard data={props.data}/>) 
    }

    const imageCheck = () => {
        let flag = false;
        const domainNames = ['.org', '.com', '.net', '.gov', '.mil', '.edu'];
        domainNames.forEach(name => { if (productImg.indexOf(name))flag = true});
        if (flag) {
            return(<></>);
            return (<img src={productImg}></img>);
        } else {
            //locally stored image?
            return(<></>);
        }
    }

    //ACTIONS
    const deleteCard = (id) => {
        axios.delete(`/${id}`);
    }


    return (
        <div>
            {updateModalShow}
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