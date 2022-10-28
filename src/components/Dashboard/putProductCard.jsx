import React, { useState, useEffect } from 'react';
import { clearForm } from '../../util/util';

const UpdateProductCard = () => {
    const [_id, set_id] = useState('');
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');


    const handleInputChange = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value
    
        if (id === 'putName') {
            setProductName(value);
        } else if (id ==='putImg') {
            setProductImg(value);
        }
    }

    //ACTIONS
    const putCard = (id) => {
        axios.put(`${id}`, {
            productName: productName,
            description: productImg,
            // productImg: "hello 0"
        })
    }

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export default UpdateProductCard;