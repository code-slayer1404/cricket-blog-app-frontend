import { myAxios,myAxiosWithAuth } from "./helper";


export function getCommentsByPost(postId,pageNumber=1) {
    return myAxios.get(`/api/posts/${postId}/comments?pageNumber=${pageNumber}`)
        .then(response => response.data)
        .catch(e => {
            console.error("api call to get comments failed!", e);
            throw e;
        })
}

export function addComment(postId, commentData) {
    return myAxiosWithAuth.post(`/api/posts/${postId}/comments`, commentData)
        .then(response => response.data)
        .catch(e => {
            console.error("api call to add comment failed!", e);
            throw e;
        })
}

export function updateComment(postId, commentId, commentData) {
    return myAxiosWithAuth.put(`/api/posts/${postId}/comments/${commentId}`, commentData)
        .then(response => response.data)
        .catch(e => {
            console.error("api call to update comment failed!", e);
            throw e;
        })
}

export function deleteComment(postId, commentId) {
    return myAxiosWithAuth.delete(`/api/posts/${postId}/comments/${commentId}`)
        .then(response => response.data)
        .catch(e => {
            console.error("api call to delete comment failed!", e);
            throw e;
        })
}

export function getComment(postId, commentId) {
    return myAxios.get(`/api/posts/${postId}/comments/${commentId}`)
        .then(response => response.data)
        .catch(e => {
            console.error("api call to get comment failed!", e);
            throw e;
        })
}