// frontend/services/auth.ts
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

const API_URL = "https://localhost:7025/api/Auth"; 

export async function register(data: RegisterData) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            passwordHash: data.password, // backend PasswordHash bekliyor
        }),
    });

    if (!res.ok) throw new Error("Register failed");
    return res.json();
}

export async function login(data: LoginData) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: data.email,
            passwordHash: data.password, // backend login PasswordHash ile kontrol ediyor
        }),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json(); // { token: "..."}
}
