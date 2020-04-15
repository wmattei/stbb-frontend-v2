import { SET_TITLE } from './actionTypes';

export function setTitle(title) {
    return { type: SET_TITLE, payload: title };
}
