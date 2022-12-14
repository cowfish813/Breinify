import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getBase64, clearFormById } from '../../util/util';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from '../../actions/productCardActions';
import { unRenderModal } from '../../actions/modalActions';

const UpdateProductCard = () => {
    const [productImg, setProductImg] = useState('');
    const [productName, setProductName] = useState('');
    const id = useSelector(state => state.modalReducer.id);
    const isModalOpen = useSelector(state => state.modalReducer.modal);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value
    
        if (id === 'update-name') {
            setProductName(value);
        } else if (id ==='update-img') {
            const file = e.target.files[0]; 
            getBase64(file, setProductImg);
        }
    }

    const handleSubmit = () => {
        const payload = {
            productName: productName,
            productImg: productImg,
        }
        dispatch(updateCard(id, payload));
        dispatch(unRenderModal());
        clearFormById('updateProd');
    }

    const handleExit = () => {
        dispatch(unRenderModal());
    }

    return (
        <Modal 
            show={isModalOpen}
        >
            <Modal.Dialog id='update-modal' className='standard modal-content card-border pad bg-white fixed'>
                <Modal.Header closeButton onClick={() => handleExit()}>
                    <Modal.Title className='modal-title'>Update Product Card</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    <Form id='updateProd' onSubmit={() => handleSubmit()}>
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
                                type="file" 
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
        </Modal>
    );

}

export default UpdateProductCard;

//combine with create
    //many shared resources in update vs create
        