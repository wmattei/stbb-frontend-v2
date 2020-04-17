import { SET_TITLE, SET_BACK_BUTTON_VISIBILITY } from '../actions/actionTypes';

type AppState = {
    title: String;
    showBackButton: Boolean
};

const initialState = {
    title: 'STBB',
    showBackButton: false
};

const authReducer = (state: AppState = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload,
            };
        case SET_BACK_BUTTON_VISIBILITY:
            return {
                ...state,
                showBackButton: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
