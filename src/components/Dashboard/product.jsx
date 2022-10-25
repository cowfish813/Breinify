import React, { useState } from 'react';

const ProductCard = () => {
    const [productImg, setproductImg] = useState('');
    const [productName, setProductName] = useState('');
    const [desc, setDesc] = useState('');
    const [creationTime, setCreationTime] = useState('');

    return (
        <div>
            <div>
                <span>{productImg}</span>
                <span>{productName}</span>
                <span>{desc}</span>
                <span>{creationTime}</span>
            </div>
        </div>
    )

}


export default ProductCard;