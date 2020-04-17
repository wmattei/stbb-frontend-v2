import { SET_TITLE, SET_BACK_BUTTON_VISIBILITY } from './actionTypes';

export function setTitle(title) {
    return { type: SET_TITLE, payload: title };
}

export function setBackButtonVisibility(show) {
    return { type: SET_BACK_BUTTON_VISIBILITY, payload: show };
}
