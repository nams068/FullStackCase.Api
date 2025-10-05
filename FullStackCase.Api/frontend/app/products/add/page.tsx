"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://localhost:7025/api/Product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    description: form.description,
                    price: parseFloat(form.price),
                    category: form.category,
                }),
            });

            if (!res.ok) {
                throw new Error("Urun ekleme basarisiz.");
            }

            await res.json();
            router.push("/products");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-4">Yeni Urun Ekle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Urun adi"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Urun aciklamasi"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Fiyat"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Kategori"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded"
                />
                {error && <p className="text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    {loading ? "Ekleme suruyor..." : "Urun Ekle"}
                </button>
            </form>
        </div>
    );
}
