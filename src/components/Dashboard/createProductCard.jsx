import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

const CreateProductCard = () => {
    const [productName, setProductName] = useState('')
    const [productImg, setproductImg] = useState('');
    const [description, setDescription] = useState('');
    
    //ACTION
    const createCard = (newCard) => {
        console.log(newCard ,'axios');

        axios.post('/newCard', {
            productName: newCard.productName,
            description: newCard.description,
            productImg: newCard.productImg
        })
    }
    //BUTTON
    const handleSubmit = () => {

        const newCard = {
            productName,
            description,
            productImg
        }

        console.log(newCard, 'submit handler');
        createCard(newCard);
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
            setproductImg(value);
        }
    }

    return (
    <Form onSubmit={() => handleSubmit()}>
      <Form.Group className="mb-3" controlId="formCreateName">
        <Form.Label>Name</Form.Label> 
        <Form.Control id='name' type="text" placeholder="Enter Name" onInput={(e) => handleInputChange(e)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCreateDesc">
        <Form.Label>Description</Form.Label> 
        <Form.Control id='desc' as="textarea" placeholder="Enter Description" onInput={(e) => handleInputChange(e)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCreateName">
        <Form.Label>Product Image Link</Form.Label> 
        <Form.Control id='img' type="text" placeholder="Enter Image Link" onInput={(e) => handleInputChange(e)} />
      </Form.Group>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    )
}

export default CreateProductCard;