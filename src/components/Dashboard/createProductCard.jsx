import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearForm } from '../../util/util';
import { connect } from 'react-redux';
import { createCard } from '../../actions/productCardActions';
// import axios from 'axios';

const CreateProductCard = () => {
    const [productName, setProductName] = useState('')
    const [productImg, setProductImg] = useState('');
    const [description, setDescription] = useState('');
    
    //ACTION
    // const createCard = (newCard) => {
    //     axios.post('/newCard', {
    //         productName: newCard.productName,
    //         description: newCard.description,
    //         productImg: newCard.productImg
    //     })
    // }

    //BUTTON
    const handleSubmit = () => {
        //IF CONDITION for empty fields in future iteration
        const newCard = {
            productName,
            description,
            productImg
        }
        
        createCard(newCard);
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

const mdtp = (dispatch) => { return ({
    createCard: () => dispatch(createCard())
})}

const mstp = (state) =>{
    return (
        {}
    )
}

export default connect(mstp, mdtp)(CreateProductCard);