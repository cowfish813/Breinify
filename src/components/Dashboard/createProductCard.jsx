import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearForm } from '../../util/util';
import { useDispatch } from 'react-redux';
import { createCard } from '../../actions/productCardActions';

const CreateProductCard = () => {
    const [productName, setProductName] = useState('')
    const [productImg, setProductImg] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    //BUTTON
    const handleSubmit = () => {
        // TODO
        //IF CONDITION for empty fields for local error handling if time allows
        const newCard = {
            productName,
            description,
            productImg
        }
        
        dispatch(createCard(newCard));
        const ids = ['name', 'desc', 'img'];
        clearForm(ids);
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
            setProductImg(value);
        }
    }

    return (
        <Form onSubmit={() => handleSubmit()}>
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
                    id='img' type="text" 
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