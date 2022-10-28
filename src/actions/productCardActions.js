const fetchCards = async () => {
    const res = await axios.get('/get');
    await setData(res.data.value); //reset for redux
}

const deleteCard = (id) => {
    axios.delete(`/${id}`);
}

    const updateCard = (id, payload) => {
        console.log(payload)
        axios.put(`/${id}`, payload)    
    }