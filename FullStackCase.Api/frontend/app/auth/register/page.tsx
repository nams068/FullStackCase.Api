"use client";

import { useState } from "react";
import { register } from "../../../services/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Sifreler uyusmuyor");
            return;
        }

        setLoading(true);
        try {
            const res = await register({ username, email, password });
            console.log("Register success:", res);

            dispatch(setAuth({ token: res.token, email }));

            localStorage.setItem("token", res.token);

            alert("Kayit basarili!");
        } catch (err: any) {
            setError(err.message || "Kayit basarisiz");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Kayit Ol</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Kullanici adi"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
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
                <input
                    type="password"
                    placeholder="Sifreyi Onayla"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Kayit yapiliyor..." : "Kayit Ol"}
                </button>
            </form>
            <p className="mt-4 text-sm">
                Hesabin var mi?{" "}
                <a href="/auth/login" className="text-blue-600 underline">
                    Giris Yap
                </a>
            </p>
        </div>
    );
}
