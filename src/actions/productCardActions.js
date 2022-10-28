const createCard = (newCard) => {
    axios.post('/newCard', {
        productName: newCard.productName,
        description: newCard.description,
        productImg: newCard.productImg
    })
}

const fetchCards = async () => {
    const res = await axios.get('/get');
    await setData(res.data.value); //reset for redux
}

const updateCard = (id, payload) => {
    axios.put(`/${id}`, payload)    
}

const deleteCard = (id) => {
    axios.delete(`/${id}`);
}