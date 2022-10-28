import axios from 'axios';
import {createAction} from '@reduxjs/toolkit';

const receiveCards = createAction('RECEIVE_CARDS');
const receiveCard = createAction('RECEIVE_CARD');
const patchCard = createAction('PATCH_CARD');
const removeCard = createAction('REMOVE_CARD');

export const createCard = (newCard) => async dispatch => {
    try {
        const res = await axios.post('/newCard', {
            productName: newCard.productName,
            description: newCard.description,
            productImg: newCard.productImg
        });

        dispatch(receiveCard(res));
    } catch (err) {
        console.log(err);
    }
}

export const fetchCards = () => async dispatch => {
    try {
        const res = await axios.get('/get');
        dispatch(receiveCards(res));
        // await setData(res.data.value); //reset for redux

    } catch (err) {
        console.log(err);
    }
}

export const updateCard = (id, payload)=> async dispatch => {
    try {
        const res = await axios.put(`/${id}`, payload);
        dispatch(patchCard(res));
    } catch (err) {
        console.log(err);
    }
}

export const deleteCard = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/${id}`);
        dispatch(removeCard(res));
    } catch (err) {
        console.log(err);
    }
}