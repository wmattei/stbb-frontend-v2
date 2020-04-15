import { User } from '../../constants/types';
import { LOGIN, LOGOUT, SET_CURRENT_USER } from '../actions/actionTypes';

type AuthState = {
    isAuthenticated: Boolean | null | undefined;
    currentUser: User | null | undefined;
};

const initialState = {
    isAuthenticated: false,
    currentUser: null,
};

const authReducer = (state: AuthState = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default authReducer;
