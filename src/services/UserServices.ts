import { JwtAuthRequest, JwtAuthResponse } from "@/types/dto/AuthDTO";
import { myAxios } from "@/lib/helper";
import { UserReadDTO } from "@/types/dto/UserDTO";
import { ApiResponse } from "@/types/ApiResponse";
import { AxiosError } from "axios";

type LoginResponse = ApiResponse<JwtAuthResponse>
type RegisterResponse = ApiResponse<UserReadDTO>

export async function signup(data: JwtAuthRequest): Promise<RegisterResponse> {
    try {
        // axios response already in json
        const response = await myAxios.post<UserReadDTO>("/api/auth/register", data);
        return { ok: true, data: response.data }
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>
        console.log(axiosError.response?.data);
        const message = axiosError.response?.data ?? "Signup failed!"
        return { ok: false, error: message }
    }
}

export async function login(data: JwtAuthRequest): Promise<LoginResponse> {
    // TypeScript types are compile-time only and don't validate API data at runtime.
    // Frontend and backend DTOs can drift and cause runtime errors.
    // Use Zod for runtime validation.
    try {
        const response = await myAxios.post<JwtAuthResponse>("/api/auth/login", data);
        return { ok: true, data: response.data }
    } catch (e: any) {
        const axiosError = e as AxiosError<string>
        const message = axiosError.response?.data ?? "Login Failed";
        return { ok: false, error: message }
    }
}