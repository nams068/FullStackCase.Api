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
                const data = await getProductById(Number(params.id));
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch product");
            } finally {
                setLoading(false);
            }
        }; 

        fetchProduct();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="font-semibold">${product.price}</p>
            <p className="text-gray-500">{product.category}</p>
        </div>
    );
}
