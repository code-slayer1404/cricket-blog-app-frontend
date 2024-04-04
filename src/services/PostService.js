import { getUserDetails } from "../auth/loginHelper";
import { myAxios } from "./helper";

export function addPost(postData) {
    return myAxios.post(`/api/users/${getUserDetails().id}/posts`, postData, {
        headers: {
            'Authorization': `Bearer ${
                JSON.parse(localStorage.getItem("data")).token
            }`
        }
}).then(response=>response)
}


export function getUserPosts() {
    return myAxios.get(`/api/users/${getUserDetails().id}/posts`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("data")).token
                }`
        }
    }).then(response => response)
}