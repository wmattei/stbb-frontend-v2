import Axios from './config';

export class UserApi {
    static uploadAvatar(file, data) {
        const formData = new FormData();
        formData.append('upload', file);

        return Axios({
            method: 'POST',
            url: `file/upload-avatar?x=${data.x}&y=${data.y}&width=${data.width}&height=${data.height}&originalWidth=${data.originalWidth}&originalHeight=${data.originalHeight}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => res.data);
    }

    static updateMe(data) {
        return Axios({
            method: 'POST',
            url: '/users/update-me',
            data,
        }).then((res) => res.data);
    }

    static getStudentsByClassId(classId) {
        return Axios({
            method: 'GET',
            url: `/users/list-by-class/${classId}`,
        }).then((res) => res.data);
    }

    static saveGrade(data) {
        return Axios({
            method: 'POST',
            url: '/users/change-grade',
            data,
        });
    }

    static getStudents() {
        return Axios({
            method: 'GET',
            url: '/users/students',
        }).then((res) => res.data);
    }
    
    static getTeachers() {
        return Axios({
            method: 'GET',
            url: '/users/teachers',
        }).then((res) => res.data.data);
    }
    
    static getSubjects() {
        return Axios({
            method: 'GET',
            url: '/subjects',
        }).then((res) => res.data.data);
    }
}
