import { User } from '../../constants/types';
import { LOGIN, LOGOUT } from '../actions/actionTypes';

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
        default:
            return state
    }
};

export default authReducer;
