import React, { useState } from 'react';
import UpdateProductCard from './updateProductCard';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../actions/productCardActions';
import { renderModal } from '../../actions/modalActions';

const ProductCard = (props) => { 
    const {createdAt, description, productImg, productName, _id} = props.data
    const [updateModalShow, setUpdateModalShow] = useState(false);
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
    // const deleteCard = (id) => {
    //     axios.delete(`/${id}`);
    // }


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