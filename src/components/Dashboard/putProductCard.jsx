import React, { useState, useEffect } from 'react';

const UpdateProductCard = () => {
    const [id, setId] = useState('');
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

//input change