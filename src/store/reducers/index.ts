import { combineReducers } from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
    auth: authReducer,
    app: appReducer,
    toastr: toastrReducer,
});
