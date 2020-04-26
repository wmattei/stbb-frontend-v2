import Axios from './config';

class CommentApi {
    static listCommentsByDocument(documentId, take, page) {
        return Axios({
            method: 'GET',
            url: `/comments?ownerTable=stbb_file_model&ownerId=${documentId}&take=${take}&page=${page}`,
        }).then((res) => res.data);
    }
    
    static createDocumentComment(data) {
        return Axios({
            method: 'POST',
            url: `/comments`,
            data
        }).then((res) => res.data);
    }
}

export default CommentApi;
