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
            const productCard = action.payload.data.value;
            NEW_STATE.productCards[productCard._id] = productCard;
        })
        .addCase('REMOVE_CARD', (NEW_STATE, action) => {
            const _id = action.payload.data.value._id;
            delete NEW_STATE.productCards[_id];
        })
        .addCase('PATCH_CARD', (NEW_STATE, action) => {
            const _id = action.payload.data.value._id;
            NEW_STATE.productCards[_id] = action.payload.data.value;
        })
})

export default productCardReducer;