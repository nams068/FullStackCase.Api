"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.replace("/auth/login");
        } else {
            setToken(storedToken);
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/auth/login");
    };

    if (loading) return <p className="p-4 text-center">Loading profile...</p>;

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="mb-2"><strong>Token:</strong> {token}</p>
            <p className="mb-4">Here you can display more user info, orders, settings, etc.</p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
}
