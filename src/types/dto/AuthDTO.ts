import { UserReadDTO } from "@/types/dto/UserDTO";

export interface JwtAuthRequest{
    username: string;
    password: string;
}

export interface JwtAuthResponse{
    token : string;
    user : UserReadDTO
}