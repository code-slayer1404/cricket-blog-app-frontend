import { PostReadDTO } from "@/types/dto/PostDTO";
import { UserReadDTO } from "@/types/dto/UserDTO";

export interface CommentWriteDTO{
    content : string;
}
export interface CommentReadDTO{
    id : number;
    content : string;
    date : string;
    user : UserReadDTO;
    post : PostReadDTO
}


export interface CommentPagedResponse {
    currentPage: number;
    totalPages: number;
    content: CommentReadDTO[]
}