import Axios from 'axios';
import { toastr } from 'react-redux-toastr';

const config = {
    // backendUrl: 'https://staging.api.collums.co.uk',
    backendUrl: 'http://localhost:3000/v1/api',
    token: '',
};

export const setup = (token) => {
    const bearer = `Bearer ${token}`;
    localStorage.setItem('token', bearer);
    config.token = bearer;
};

export default (options) =>
    Axios({
        ...options,
        headers: {
            Authorization: config.token,
            ...(options.headers || {}),
        },
        baseURL: config.backendUrl,
        transformResponse: [transformResponse],
    });

const transformResponse = (data, header) => {
    data = JSON.parse(data);
    toastr.success(data.message);
    
    return data;
};
