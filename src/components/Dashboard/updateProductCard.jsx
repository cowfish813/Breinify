import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearForm } from '../../util/util';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from '../../actions/productCardActions';
import { unRenderModal } from '../../actions/modalActions';

const UpdateProductCard = (props) => {
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const isModalOpen = useSelector(state => state.modalReducer.modal);
    const dispatch = useDispatch();
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
        dispatch(updateCard(id, payload));
        dispatch(unRenderModal());
        const ids = ['update-name', 'update-img'];
        clearForm(ids);
    }

    const handleExit = () => {
        dispatch(unRenderModal());
    }
    if (isModalOpen) {

        return (
            <Modal.Dialog>
                <Modal.Header closeButton onClick={() => handleExit()}>
                    <Modal.Title>Update Product Card</Modal.Title>
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
                                placeholder="Enter New Image URL" 
                                onInput={(e) => handleInputChange(e)} 
                                />
                        </Form.Group>
    
                        <Button variant="primary" type="submit">
                            Submit Changes
                        </Button>
                    </Form>
                </Modal.Body>
    
            </Modal.Dialog>
        );
    } else {
        return (<></>);
    }
}

export default UpdateProductCard;