import { SET_TITLE } from '../actions/actionTypes';

type AppState = {
    title: String;
};

const initialState = {
    title: 'STBB',
};

const authReducer = (state: AppState = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
