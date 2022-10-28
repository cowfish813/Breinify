export const clearForm = (idsArray) => {
    idsArray.forEach(id => { //consider modularizing this
        const htmlID = document.getElementById(id);
        htmlID.value = '';
    })
}

export const closeModal = () => {
    
}