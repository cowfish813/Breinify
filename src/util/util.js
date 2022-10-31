export const clearFormById = (str) => {
    document.getElementById(`${str}`).reset();
};

export const getBase64 = async (file, setState) => {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = ()  => {
        setState(reader.result);
    };
    reader.onerror = (error) => {
        console.log('1Error: ', error);
        
    };
};

export const resizeImage = (file, resizeFactor, quality) => { //quality between 0-1
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = document.createElement('img')
    img.src = file;

    const curWidth = img.width;
    const curHeight = img.height;

    context.drawImage(img, 0, 0, curWidth * resizeFactor, curHeight * resizeFactor);

    return canvas.toBlob(blob => {
        if (blob) img.src = URL.createObjectURL();
    }, 'image/jpeg', quality)

};

export const formatDate = (date) => {
    const res = new Date(date)
    const month = res.getMonth();
    const day = res.getDate();
    const year = res.getFullYear();
    return month + '/' +  day + '/' + year
};
