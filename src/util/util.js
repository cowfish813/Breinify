export const clearForm = (idsArray) => {
    idsArray.forEach(id => { //consider modularizing this
        const htmlID = document.getElementById(id);
        htmlID.value = '';
    })
}

export const getBase64 = async (file, setState) => {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = ()  => {
        setState(reader.result);
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
    };
}