"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "../../services/product";
import { Product } from "../../types/Product";
import Navbar from "../../components/Navbar";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [categories, setCategories] = useState<string[]>(["All"]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories = Array.from(new Set(data.map(p => p.category))).filter(Boolean);
                setCategories(["All", ...uniqueCategories]);
            } catch (err: any) {
                setError(err.message || "Urunler yuklenemedi");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let tempProducts = [...products];

        if (selectedCategory !== "All") {
            tempProducts = tempProducts.filter(p => p.category === selectedCategory);
        }

        if (minPrice !== "") tempProducts = tempProducts.filter(p => p.price >= minPrice);
        if (maxPrice !== "") tempProducts = tempProducts.filter(p => p.price <= maxPrice);

        if (sortOrder === "asc") {
            tempProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            tempProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(tempProducts);
    }, [products, selectedCategory, minPrice, maxPrice, sortOrder]);

    if (loading) return <p className="p-4 text-center">Urunler yukleniyor...</p>;
    if (error) return <p className="p-4 text-center text-red-600">Hata: {error}</p>;

    return (
        <div className="p-0">
            <Navbar /> {/* navbar burada */}

            {/* Filtreler */}
            <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="border p-2 rounded"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Minimum Fiyat"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : "")}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Maksimum Fiyat"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
                        className="border p-2 rounded"
                    />
                    <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Fiyata Gore Sirala</option>
                        <option value="asc">Dusukten Yuksege</option>
                        <option value="desc">Yuksekten Dusege</option>
                    </select>
                </div>

                {/* Urunler */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="border rounded-lg shadow-md p-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                            </div>
                            <div className="mt-auto">
                                <p className="text-xl font-semibold text-green-600 mb-1">${product.price}</p>
                                <p className="text-gray-500 text-sm">{product.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
