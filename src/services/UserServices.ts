import { JwtAuthRequest, JwtAuthResponse } from "@/types/dto/AuthDTO";
import { myAxios } from "@/services/helper";
import { UserReadDTO } from "@/types/dto/UserDTO";
import { ApiResponse } from "@/types/ApiResponse";

type LoginResponse = ApiResponse<JwtAuthResponse>
type RegisterResponse = ApiResponse<UserReadDTO>

export async function signup(data: JwtAuthRequest): Promise<RegisterResponse> {
    try {
        // axios response already in json
        const response = await myAxios.post<UserReadDTO>("/api/auth/register", data);
        return { ok: true, data: response.data }
    } catch (error: any) {
        // console.log(error.response?.status);
        const message = error.response?.data || "Signup Failed"
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
        const message = e.response?.data || "Login Failed";
        return { ok: false, error: message }
    }
}