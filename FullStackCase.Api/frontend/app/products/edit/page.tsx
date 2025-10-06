"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts, updateProduct } from "../../../services/product";
import { Product } from "../../../types/Product";

export default function EditProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<Product | null>(null);
    const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err: any) {
                setError("Urunler getirilemedi.");
            }
        }
        fetchProducts();
    }, []);

    const handleSelect = (product: Product) => {
        setSelected(product);
        setForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return;
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token bulunamadi");
            await updateProduct(selected.id, {
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                category: form.category,
            }, token);
            router.push("/products");
        } catch (err: any) {
            setError("Guncelleme basarisiz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-4">Urun Duzenle</h1>
            {error && <p className="text-red-600">{error}</p>}

            {!selected ? (
                <div>
                    <p className="mb-2">Duzenlemek istediginiz urunu secin:</p>
                    {products.map(p => (
                        <div key={p.id} className="flex justify-between items-center border-b py-2">
                            <p>{p.name}</p>
                            <button
                                onClick={() => handleSelect(p)}
                                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                            >
                                Duzenle
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Kaydet
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelected(null)}
                            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                        >
                            Vazgec
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
