import {createAction} from '@reduxjs/toolkit';

const openModal = createAction('OPEN_MODAL');
const closeModal = createAction('CLOSE_MODAL');

export const renderModal = (id) => dispatch => {
    dispatch(openModal({modal: true, id: id}));
}

export const unRenderModal = () => dispatch => {
    dispatch(closeModal(false));
}