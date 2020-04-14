import Axios from './config';

class AuthApi {
    static login(email, password) {
        return Axios({
            method: 'POST',
            url: '/auth/login',
            data: { email, password },
        });
    }
}

export default AuthApi;
