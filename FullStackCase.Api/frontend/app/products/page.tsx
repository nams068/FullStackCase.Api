"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/product";
import { Product } from "../../types/Product";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {products.map(product => (
                <div key={product.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="font-semibold">${product.price}</p>
                </div>
            ))}
        </div>
    );
}
