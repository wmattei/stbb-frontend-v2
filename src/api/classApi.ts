import Axios from './config';

class ClassApi {
    static findByTeacher(teacherId) {
        return Axios({
            method: 'GET',
            url: `/classes/find-by-teacher/${teacherId}`
        }).then(res => res.data);
    }
}

export default ClassApi;
