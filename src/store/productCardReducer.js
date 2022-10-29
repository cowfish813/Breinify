import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    productCards: { }
};

const productCardReducer = createReducer(initialState, builder => {
    builder
        .addCase('RECEIVE_CARDS', (NEW_STATE, action) => {
            const productCards = action.payload.data.value;
            NEW_STATE.productCards = productCards;
        })
        .addCase('RECEIVE_CARD', (NEW_STATE, action) => {
            console.log(NEW_STATE, action, '2');
            const productCard = action.payload;
            NEW_STATE.productCards[productCard._id] = productCard;
        })
        .addCase('REMOVE_CARD', (NEW_STATE, action) => {
            console.log(NEW_STATE, action, '3');
            const _id = action.payload.id;
            delete NEW_STATE.productCards[_id];
        })
        .addCase('PATCH_CARD', (NEW_STATE, action) => {
            console.log(NEW_STATE, action, '4');
            //fill in later, work on why actions arent working
            // const _id = action.payload.id;
            
        })
})

export default productCardReducer;