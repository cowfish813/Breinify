import {createAction} from '@reduxjs/toolkit';

const openModal = createAction('OPEN_MODAL');
const closeModal = createAction('CLOSE_MODAL');

export const renderModal = () => async dispatch => {
    dispatch(openModal(true));
}

export const unRenderModal = () => async dispatch => {
    dispatch(closeModal(false));
}