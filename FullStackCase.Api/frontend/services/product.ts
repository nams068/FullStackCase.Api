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
export async function updateProduct(id: number, product: Partial<Product>, token: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
}

export async function deleteProduct(id: number, token: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
}

