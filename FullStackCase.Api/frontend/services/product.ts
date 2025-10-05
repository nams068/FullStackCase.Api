import { Product } from "../types/Product";

const API_URL = "https://localhost:7025/api/Product";

export async function getAllProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.data ?? data; 
}

export async function getProductById(id: number): Promise<Product> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return data.data ?? data; 
}
export async function getMyProducts(token: string) {
    const res = await fetch("https://localhost:7025/api/Product/my-products", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch my products");
    return res.json();
}

