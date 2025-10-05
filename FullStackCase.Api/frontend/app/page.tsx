"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllProducts } from "../services/product";
import { Product } from "../types/Product";
import Navbar from "../components/Navbar";

export default function Home() {
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar /> {/* navbar burada */}

            {/* Banner */}
            <div className="relative w-full h-64 sm:h-96">
                <Image
                    src="/banner-placeholder.jpg"
                    alt="Banner"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-2">Buyuk Yaz Indirimi!</h2>
                    <p className="text-lg sm:text-xl">Secili urunlerde %50'ye varan indirim</p>
                </div>
            </div>

            {/* Filtreler ve Products Grid */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">One Cikan Urunler</h3>
                    <a
                        href="/products"
                        className="text-blue-600 underline hover:text-blue-800 text-sm"
                    >
                        Tumunu Gor
                    </a>
                </div>

                {/* Filtreleme */}
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
                {loading ? (
                    <p className="p-4 text-center">Urunler yukleniyor...</p>
                ) : error ? (
                    <p className="p-4 text-center text-red-600">Hata: {error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="border rounded-lg shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white flex flex-col justify-between"
                                >
                                    <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <div className="mt-auto flex justify-between items-center">
                                        <span className="text-green-600 font-bold">${product.price}</span>
                                        <span className="text-gray-500 text-sm">{product.category}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">Urun bulunamadi.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

