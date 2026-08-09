interface ApiSuccess<T> {
    ok: true;
    data: T;
}

interface ApiFailure {
    ok: false;
    error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure