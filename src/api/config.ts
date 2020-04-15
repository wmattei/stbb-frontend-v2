import Axios from 'axios';
import { toastr } from 'react-redux-toastr';

const config = {
    // backendUrl: 'https://staging.api.collums.co.uk',
    backendUrl: 'http://localhost:3000/v1/api',
};

export default (options) =>
    Axios({
        ...options,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            ...(options.headers || {}),
        },
        baseURL: config.backendUrl,
        transformResponse: [transformResponse],
    });

const transformResponse = (data, header) => {
    data = JSON.parse(data);
    if (data.message) toastr.success(data.message);
    if (data.error) toastr.error(data.error);
    localStorage.setItem('token', header.newtoken);

    return data;
};
