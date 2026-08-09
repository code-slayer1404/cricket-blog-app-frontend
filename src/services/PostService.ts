import { getUserDetails } from "@/auth/loginHelper";
import { PostReadDTO, PostsPagedResponse, PostWriteDTO } from "@/types/dto/PostDTO";
import { myAxios, myAxiosWithAuth } from "@/services/helper";

export function addPost(postData: PostWriteDTO) {
    return myAxiosWithAuth.post(`/api/users/${getUserDetails().id}/posts`, postData)
        .then(response => response)
        .catch(error => {
            // Handle errors here

            console.error("Error adding post:", error.response);
            // Re-throw the error to be caught by the caller
            throw error;
        });
}

export async function getUserPosts(pageNumber = 1) : Promise<PostsPagedResponse> {
    try{

        const response = await myAxiosWithAuth.get<PostsPagedResponse>(`/api/users/${getUserDetails().id}/posts?pageNumber=${pageNumber}`);
        return response.data

    }catch(error){
        console.error("api call to get user posts failed!", error);
        throw error;
    }
}

export async function getAllPosts(pageNumber = 1): Promise<PostsPagedResponse> {
    try{
        const response = await myAxios.get<PostsPagedResponse>(`/api/posts?pageNumber=${pageNumber}`);
        return response.data
    }catch(e){
        console.error("api call to get all users failed!", e);
        throw e;
    }
}

export async function getPost(id: number):Promise<PostReadDTO> {
    try {
        const response = await myAxios.get<PostReadDTO>(`/api/posts/${id}`);
        return response.data
    } catch (error) {
        console.error("API call to get post failed!", error);
        throw error;
    }
}


export function deletePost(user_id: number, post_id: number) {
    return myAxiosWithAuth.delete(`/api/users/${user_id}/posts/${post_id}`)
        .then(response => response)
        .catch(e => {
            console.error("api call to delete post failed!", e);
            throw e;
        })
        ;
}


export function updatePost(user_id: number, post_id: number, postData: PostWriteDTO) {
    return myAxiosWithAuth.put(`/api/users/${user_id}/posts/${post_id}`, postData)
        .then(response => response)
        .catch(e => {
            console.error("api call to update post failed!", e);
            throw e;
        })
}

export function myDateFormatter(date_response: any) {
    const date = new Date(date_response);
    return date.toLocaleString("en-GB");
    //if date_response is null we get 1970 date
}




