"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "../../services/auth";

interface UserProfile {
    id: string;
    username: string;
    email: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
                setUsername(data.username);
                setEmail(data.email);
            } catch (err) {
                console.error("Profile fetch error:", err);
                router.replace("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/auth/login");
    };

    const handleUpdate = async () => {
        try {
            await updateProfile({ username, email, password });

            const data = await getProfile();
            setProfile(data);
            setUsername(data.username);
            setEmail(data.email);
            setPassword("");
            setMessage("Profile updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            setMessage("Failed to update profile");
        }
    };


    if (loading) return <p className="p-4 text-center">Profil yukleniyor...</p>;
    if (!profile) return <p className="p-4 text-center text-red-600">Profil bulunamadi.</p>;

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
            <h1 className="text-2xl font-bold mb-4">Profil</h1>

            <label className="block mb-2">
                <span className="text-gray-700">Kullanici Adi</span>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                />
            </label>

            <label className="block mb-2">
                <span className="text-gray-700">Email</span>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                />
            </label>

            <label className="block mb-4">
                <span className="text-gray-700">Yeni Sifre</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                />
            </label>

            {message && <p className="mb-4 text-center text-sm text-green-600">{message}</p>}

            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-2"
            >
                Profili Guncelle
            </button>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
                Cikis Yap
            </button>
        </div>
    );
}
