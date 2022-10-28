import { createReducer, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const initialState = {
    productCard: {}
};

const productCardReducer = createReducer(initialState, builder => {
    builder
        .addCase('RECEIVE_CARDS', (NEW_STATE, action) => {
            const productCards = {};
            console.log(action.payload);
            action.payload.data.map(card => productCards[card._id]);
            NEW_STATE.productCards = productCards;
        })
        .addCase('RECEIVE_CARD', (NEW_STATE, action) => {
            const productCard = action.payload;
            console.log(action.payload);
            NEW_STATE.productCards[productCard._id] = productCard;
        })
        .addCase('REMOVE_CARD', (NEW_STATE, action) => {
            const _id = action.payload.id;
            delete NEW_STATE.productCards[_id];
        })
        .addCase('PATCH_CARD', (NEW_STATE, action) => {
            //fill in later
        })
})

export default productCardReducer;