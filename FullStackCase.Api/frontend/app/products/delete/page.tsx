"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts, deleteProduct } from "../../../services/product";
import { Product } from "../../../types/Product";

export default function DeleteProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const handleDelete = async (id: number) => {
        if (!confirm("Bu urunu silmek istediginize emin misiniz?")) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token bulunamadi");
            await deleteProduct(id, token);
            setProducts(products.filter(p => p.id !== id));
        } catch (err: any) {
            setError("Silme islemi basarisiz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
            <h1 className="text-2xl font-bold mb-4">Urun Sil</h1>
            {error && <p className="text-red-600">{error}</p>}
            {products.map(p => (
                <div key={p.id} className="flex justify-between items-center border-b py-2">
                    <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.category} - ${p.price}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(p.id)}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                        Sil
                    </button>
                </div>
            ))}
        </div>
    );
}
