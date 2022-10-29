import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    modal: false
};

const modalReducer = createReducer(initialState, builder => {
    builder
        .addCase('OPEN_MODAL', (NEW_STATE, action) =>{
            console.log(action);
            NEW_STATE.modal = true;
        })
        .addCase('CLOSE_MODAL', (NEW_STATE, action) => {
            console.log(action);
            NEW_STATE.modal = false;
            NEW_STATE.id = null;
        })
})

export default modalReducer;