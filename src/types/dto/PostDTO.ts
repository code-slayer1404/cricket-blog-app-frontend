import { UserReadDTO } from "@/types/dto/UserDTO";

export interface PostWriteDTO{
    title : string;
    content : string;
}

export interface PostReadDTO{
    id : number;
    title : string;
    content : string;
    date: string; //backend sends iso string (Spring jackson default)
    user : UserReadDTO
}

export interface PostsPagedResponse{
    currentPage : number;
    totalPages : number;
    content : PostReadDTO[]
}