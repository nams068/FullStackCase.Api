"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllProducts } from "../services/product";
import { Product } from "../types/Product";
import Navbar from "../components/Navbar"; // import ettik

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                console.log("Failed to fetch products", err);
            }
        };
        fetchProducts();
    }, []);

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
                    <h2 className="text-4xl sm:text-5xl font-bold mb-2">Big Summer Sale!</h2>
                    <p className="text-lg sm:text-xl">Up to 50% off on selected products</p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Featured Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white flex flex-col justify-between"
                            >
                                <div className="h-40 relative mb-4">
                                    <Image
                                        src="/product-placeholder.jpg"
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-green-600 font-bold">${product.price}</span>
                                    <span className="text-gray-500 text-sm">{product.category}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
