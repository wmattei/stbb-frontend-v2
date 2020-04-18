import Axios from './config';

class ClassApi {
    static findByTeacher(teacherId) {
        return Axios({
            method: 'GET',
            url: `/classes/find-by-teacher/${teacherId}`
        }).then(res => res.data);
    }
    
    static findByStudent(studentId) {
        return Axios({
            method: 'GET',
            url: `/classes/find-by-student/${studentId}`
        }).then(res => res.data);
    }
    
    static findAll() {
        return Axios({
            method: 'GET',
            url: '/classes'
        }).then(res => res.data.data);
    }
    
    static findById(id) {
        return Axios({
            method: 'GET',
            url: `/classes/${id}`
        }).then(res => res.data);
    }
    
    static uploadDocument(file, description, classId) {
        const formData = new FormData();
        formData.append('upload', file);
        formData.append('description', description);
        
        return Axios({
            method: 'POST',
            url: `file/upload-document/${classId}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    }
    
    static deleteDocument(fileId) {
        
        return Axios({
            method: 'DELETE',
            url: `file/${fileId}`,
        }).then(res => res.data);
    }
}

export default ClassApi;
