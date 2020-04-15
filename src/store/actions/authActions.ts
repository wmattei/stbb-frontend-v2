import { LOGIN, LOGOUT, SET_CURRENT_USER } from './actionTypes';

export function login() {
    return { type: LOGIN };
}

export function logout() {
    return { type: LOGOUT };
}

export function setCurrentUser(user) {
    return { type: SET_CURRENT_USER, payload: user };
}
