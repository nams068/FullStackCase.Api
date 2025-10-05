"use client";

import { useState } from "react";
import { login } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await login({ email, password });
            console.log("Login success:", res);

            dispatch(setAuth({ token: res.token, email }));

            localStorage.setItem("token", res.token);

            alert("Giris basarili!");

            router.push("../");
        } catch (err: any) {
            setError(err.message || "Giris basarisiz");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Giris Yap</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Sifre"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Giris yapiliyor..." : "Giris Yap"}
                </button>
            </form>
            <p className="mt-4 text-sm">
                Hesabin yok mu?{" "}
                <a href="/auth/register" className="text-blue-600 underline">
                    Kayit Ol
                </a>
            </p>
        </div>
    );
}
