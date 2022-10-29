import {createAction} from '@reduxjs/toolkit';

const openModal = createAction('OPEN_MODAL');
const closeModal = createAction('CLOSE_MODAL');

export const renderModal = (_id) => dispatch => {
    dispatch(openModal(_id));
}

export const unRenderModal = () => dispatch => {
    dispatch(closeModal());
}