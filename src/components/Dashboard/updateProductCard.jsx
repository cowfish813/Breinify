import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { clearForm } from '../../util/util';

const UpdateProductCard = (props) => {
    //local variable to check for flag
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const id = props.data._id;

    const handleInputChange = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value
    
        if (id === 'update-name') {
            setProductName(value);
        } else if (id ==='update-img') {
            setProductImg(value);
        }
    }

    // TO DO
    const handleSubmit = () => {
        const payload = {
            productName: productName,
            productImg: productImg,
        }
        updateCard(id, payload)
        const ids = ['update-name', 'update-img'];
        clearForm(ids);
        //add close modal unless error func
    }

    //ACTIONS
    const updateCard = (id, payload) => {
        axios.put(`/${id}`, payload)    
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={() => handleSubmit()}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Update Name</Form.Label> 
                        <Form.Control 
                            id='update-name' 
                            type="text" 
                            placeholder="Enter Name" 
                            onInput={(e) => handleInputChange(e)} 
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Update Image</Form.Label> 
                        <Form.Control 
                            id='update-img' 
                            type="text" 
                            placeholder="Enter Name" 
                            onInput={(e) => handleInputChange(e)} 
                            />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit Changes
                    </Button>
                </Form>
            </Modal.Body>

        </Modal.Dialog>
    )
}

export default UpdateProductCard;