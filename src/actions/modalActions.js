import {createAction} from '@reduxjs/toolkit';

const openModal = createAction('OPEN_MODAL');
const closeModal = createAction('CLOSE_MODAL');

export const renderModal = () => dispatch => {
    dispatch(openModal(true));
}

export const unRenderModal = () => dispatch => {
    dispatch(closeModal(false));
}