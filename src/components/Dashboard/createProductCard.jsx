import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createCard } from '../../actions/productCardActions';
import { getBase64, clearFormById } from '../../util/util';

const CreateProductCard = () => {
    const [productName, setProductName] = useState('')
    const [productImg, setProductImg] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newCard = {
            productName,
            description,
            productImg
        }
        
        dispatch(createCard(newCard));
        clearFormById('createProd');
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value

        if (id === 'name') {
            setProductName(value);
        } else if (id ==='desc') {
            setDescription(value);
        } else if (id ==='img') {
            //create filter for size
            const file = e.target.files[0]; 
            getBase64(file, setProductImg);
        }
    }

    return (
        <Form id='createProd' onSubmit={() => handleSubmit()}>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label> 
                <Form.Control 
                    id='name' 
                    type="text" 
                    placeholder="Enter Name" 
                    onInput={(e) => handleInputChange(e)} 
                    />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label> 
                <Form.Control 
                    id='desc' 
                    as="textarea" 
                    placeholder="Enter Description" 
                    onInput={(e) => handleInputChange(e)} 
                    />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Product Image URL</Form.Label> 
                <Form.Control 
                    id='img' type="file" 
                    placeholder="Enter Image Link" 
                    onInput={(e) => handleInputChange(e)} 
                    />
            </Form.Group>


            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CreateProductCard;