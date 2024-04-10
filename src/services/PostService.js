import { getUserDetails } from "../auth/loginHelper";
import { myAxios, myAxiosWithAuth } from "./helper";

export function addPost(postData) {
    return myAxiosWithAuth.post(`/api/users/${getUserDetails().id}/posts`, postData)
        .then(response => response)
        .catch(error => {
            // Handle errors here

            console.error("Error adding post:", error.response);
            // Re-throw the error to be caught by the caller
            throw error;
        });
}
export function getUserPosts(pageNumber=1) {
    return myAxiosWithAuth.get(`/api/users/${getUserDetails().id}/posts?pageNumber=${pageNumber}`)
        .then(response => response)
        .catch(error => {
            console.error("api call to get user posts failed!", error);
            throw error;
        });
}

export function getAllPosts(pageNumber=1) {
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}`)
        .then(response => response)
        .catch(e => {
            console.error("api call to get all users failed!", e);
            throw e;
        })
}
export function getPost(id) {
    return myAxios.get(`/api/posts/${id}`)
        .then(response => response)
        .catch(e => {
            console.error("api call to get post failed!", e);
            throw e;
        })
}

export function deletePost(id) {
    return myAxiosWithAuth.delete(`/api/posts/${id}`)
        .then(response => response)
        .catch(e => {
            console.error("api call to delete post failed!", e);
            throw e;
        })
        ;
}


export function updatePost(id, postData) {
    return myAxiosWithAuth.put(`/api/posts/${id}`, postData)
        .then(response => response)
        .catch(e => {
            console.error("api call to update post failed!", e);
            throw e;
        })
}

export function myDateFormatter(date_response) {
    const date = new Date(date_response);
    return date.toLocaleDateString();
    //if date_response is null we get 1970 date
}




