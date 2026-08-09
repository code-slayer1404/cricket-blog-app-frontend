import { CommentPagedResponse, CommentReadDTO, CommentWriteDTO } from "@/types/dto/CommentDTO";
import { myAxios, myAxiosWithAuth } from "@/lib/helper";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type CommentApiResponse = ApiResponse<CommentReadDTO>
type CommentsPagedApiResponse = ApiResponse<CommentPagedResponse>

export async function getCommentsByPost(postId: number, pageNumber = 1): Promise<CommentsPagedApiResponse> {
    try {
        const response = await myAxios.get<CommentPagedResponse>(`/api/posts/${postId}/comments?pageNumber=${pageNumber}`);
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "api call to get comments failed!";
        return { ok: false, error: message }
    }

}

export async function addComment(postId: number, commentData: CommentWriteDTO): Promise<CommentApiResponse> {
    try {
        const resonse = await myAxiosWithAuth.post(`/api/posts/${postId}/comments`, commentData);
        return { ok: true, data: resonse.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "api call to add comment failed!";
        return { ok: false, error: message }
    }
}

export async function updateComment(postId: number, commentId: number, commentData: CommentWriteDTO): Promise<CommentApiResponse> {
    try {
        const response = await myAxiosWithAuth.put<CommentReadDTO>(
            `/api/posts/${postId}/comments/${commentId}`, commentData
        );
        return { ok: true, data: response.data }
    } catch (error) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "failed to update comment"
        return { ok: false, error: message }
    }
}

export async function deleteComment(postId: number, commentId: number): Promise<CommentApiResponse> {
    try {
        const response = await myAxiosWithAuth.delete(
            `/api/posts/${postId}/comments/${commentId}`
        );
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "failed to delete comment"
        return { ok: false, error: message }
    }
}

export async function getComment(postId: number, commentId: number): Promise<CommentApiResponse> {

    try {
        const response = await myAxios.get(
            `/api/posts/${postId}/comments/${commentId}`
        );
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        const message = axiosError.response?.data ?? "api call to get comment failed!"
        return { ok: false, error: message }
    }
}