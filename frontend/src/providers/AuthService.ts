import { tFetch } from "@/utils/tfetch";

const link = `${import.meta.env.BACKEND_URL || ''}/auth/login`;
const linkRefresh = `${import.meta.env.BACKEND_URL || ''}/auth/refresh`;

class AuthService {
    private subscribers: ((isAuthed: boolean) => void)[] = [];

    public subscribe(callback: (isAuthed: boolean) => void) {
        this.subscribers.push(callback);
    }

    public unsubscribe(callback: (isAuthed: boolean) => void) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
    }

    public notifySubscribers(isAuthed: boolean) {
        this.subscribers.forEach(subscriber => subscriber(isAuthed));
    }

    async login(name: string, password: string) {
        try {
            const response = await tFetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            }, 0);
            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                this.notifySubscribers(true);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    async logout() {
        try {
            await tFetch(link, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }, 0);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.notifySubscribers(false);
        } catch (error) {
            console.error(error);
        }
    }

    async refreshToken() {
        try {
            const response = await tFetch(linkRefresh, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
                    'Content-Type': 'application/json',
                },
            }, 0);
            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                this.notifySubscribers(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

}

export const authService = new AuthService();