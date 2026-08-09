import { getUserDetails } from "@/lib/loginHelper";
import { PostReadDTO, PostsPagedResponse, PostWriteDTO } from "@/types/dto/PostDTO";
import { myAxios, myAxiosWithAuth } from "@/lib/helper";
import { ApiResponse } from "@/types/ApiResponse";
import { AxiosError } from "axios";

type PostApiResponse = ApiResponse<PostReadDTO>
type PostsPagedApiResponse = ApiResponse<PostsPagedResponse>


export async function addPost(postData: PostWriteDTO): Promise<PostApiResponse> {
    try {
        const response = await myAxiosWithAuth.post<PostReadDTO>(`/api/users/${getUserDetails().id}/posts`, postData)
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        // console.error("Error adding post:", axiosError.response);
        const message = axiosError.response?.data ?? "failed to add post"
        return { ok: false, error: message }
    }
}

// simpler pattern but caller must use try catch either bt blocks or through chaining
// export async function getUserPosts(pageNumber = 1) : Promise<PostsPagedResponse> {
//     try{
//         const response = await myAxiosWithAuth.get<PostsPagedResponse>(`/api/users/${getUserDetails().id}/posts?pageNumber=${pageNumber}`);
//         return response.data;

//     }catch(error){
//         console.error("api call to get user posts failed!", error);
//         throw error;
//     }
// }

export async function getUserPosts(pageNumber = 1): Promise<PostsPagedApiResponse> {
    try {
        const response = await myAxiosWithAuth.get<PostsPagedResponse>(`/api/users/${getUserDetails().id}/posts?pageNumber=${pageNumber}`);
        return { ok: true, data: response.data };

    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "api call to get user posts failed!";
        return { ok: false, error: message }
    }
}

export async function getAllPosts(pageNumber = 1): Promise<PostsPagedApiResponse> {
    try {
        const response = await myAxios.get<PostsPagedResponse>(`/api/posts?pageNumber=${pageNumber}`);
        return {ok:true,data:response.data}
    } catch (error : unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "api call to get all posts failed!";
        return { ok: false, error: message }
    }
}

export async function getPost(id: number) : Promise<PostApiResponse> {
    try {
        const response = await myAxios.get(`/api/posts/${id}`);

        return { ok: true, data: response.data };
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>;
        const message: string = axiosError.response?.data ?? "api call to get all posts failed!";
        return { ok: false, error: message }
    }
}


export async function deletePost(user_id: number, post_id: number): Promise<PostApiResponse> {
    try {
        const response = await myAxiosWithAuth.delete<PostReadDTO>(`/api/users/${user_id}/posts/${post_id}`)
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        // console.error("Error deleting post:", axiosError.response);
        const message = axiosError.response?.data ?? "failed to delete post"
        return { ok: false, error: message }
    }
}


export async function updatePost(user_id: number, post_id: number, postData: PostWriteDTO): Promise<PostApiResponse> {
    try {
        const response = await myAxiosWithAuth.put<PostReadDTO>(`/api/users/${user_id}/posts/${post_id}`, postData)
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        // console.error("Error updating post:", axiosError.response);
        const message = axiosError.response?.data ?? "failed to update post"
        return { ok: false, error: message }
    }
}

export function myDateFormatter(date_response: string) {
    const date = new Date(date_response);
    return date.toLocaleString("en-GB");
    //if date_response is null we get 1970 date
}




