export const clearFormById = (str) => {
    document.getElementById(`${str}`).reset();
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