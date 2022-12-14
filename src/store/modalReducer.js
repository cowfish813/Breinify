import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    modal: false,
    id: null
};

const modalReducer = createReducer(initialState, builder => {
    builder
        .addCase('OPEN_MODAL', (NEW_STATE, action) => {
            NEW_STATE.modal = true;
            NEW_STATE.id = action.payload
        })
        .addCase('CLOSE_MODAL', (NEW_STATE, action) => {
            NEW_STATE.modal = false;
            NEW_STATE.id = null;
        })
})

export default modalReducer;