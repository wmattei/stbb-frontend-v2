import Axios from './config';

class AuthApi {
    static login(email, password) {
        return Axios({
            method: 'POST',
            url: '/auth/login',
            data: { email, password },
        });
    }

    static whoami() {
        return Axios({
            method: 'GET',
            url: '/auth/whoami',
        }).catch((err) => err.response);
    }
}

export default AuthApi;
