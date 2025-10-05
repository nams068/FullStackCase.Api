"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../services/product";
import { Product } from "../../../types/Product";

interface PageProps {
    params: { id: string };
}

export default function ProductDetail({ params }: PageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { id } = await params;
                const data = await getProductById(Number(id));
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Urun bilgileri getirilemedi");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params]);

    if (loading) return <p className="p-4 text-center">Yukleniyor...</p>;
    if (error) return <p className="p-4 text-center text-red-600">Hata: {error}</p>;
    if (!product) return <p className="p-4 text-center text-gray-500">Urun bulunamadi</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-semibold text-green-600">${product.price}</span>
                <span className="text-gray-500 italic">{product.category}</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Sepete Ekle
            </button>
        </div>
    );
}
