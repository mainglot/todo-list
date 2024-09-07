import { authService } from "@/providers/AuthService";

const tryRefreshToken = async () => {
    await authService.refreshToken();
};

export const tFetch = async (input: RequestInfo, init?: RequestInit, depth = 1): Promise<any> => {
    const response = await fetch(input, init);
    if (!response.ok) {
        if (response.status === 401 && depth > 0) {
            await tryRefreshToken();
            return tFetch(input, init, depth - 1);
        }
        throw new Error(response.statusText);
    }
    return response;
}